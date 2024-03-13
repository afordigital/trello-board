use leptos::html::{Div, Input, Label};
use leptos::*;
use leptos_use::{
    on_click_outside, use_drop_zone_with_options, UseDropZoneEvent, UseDropZoneOptions,
    UseDropZoneReturn,
};
use unocss_classes::uno;
use wasm_bindgen::prelude::Closure;
use wasm_bindgen::JsCast;
use web_sys::FileReader;

use crate::components::{X, Image};
use crate::models::Card;
use crate::store::KanbanState;

const DEFAULT_TEXT: &str = "Click or drag image here to upload";
const DEFAULT_TEXT_DRAG: &str = "Drop image here";

#[component]
pub fn CardDetails<F>(close_details: F, card: Card) -> impl IntoView
where
    F: Fn() + Copy + 'static,
{
    let Card {
        id,
        title,
        description,
        src_img,
        img_covered,
        ..
    } = card;

    let drop_zone_el = create_node_ref::<Label>();
    let input_file_ref = create_node_ref::<Input>();
    let target = create_node_ref::<Div>();
    let set_kanban = expect_context::<WriteSignal<KanbanState>>();
    let (load_file_text, set_load_file_text) = create_signal(DEFAULT_TEXT);
    let (title, set_title) = create_signal(title);
    let (description, set_description) = create_signal(description);
    let (src_img, set_src_img) = create_signal(src_img.clone());
    let (covered_img, set_covered_img) = create_signal(img_covered);

    let handle_upload_file = {
        let set_kanban = set_kanban.clone();
        move |file: web_sys::File| {
            set_load_file_text.set(DEFAULT_TEXT);
            if file.size() > 1000000. {
                if let Some(win) = web_sys::window() {
                    win.alert_with_message("Image size is too big")
                        .expect("Cannot show alert");
                }
                return;
            }
            if let Ok(reader) = FileReader::new() {
                let onload = {
                    let reader = reader.clone();
                    let set_src_img = set_src_img.clone();
                    Closure::wrap(Box::new(move || {
                        let res = reader.result().expect("Cannot get result from FileReader");
                        let res = res.as_string().unwrap();
                        set_src_img(res.clone());
                        log::debug!("Image Source setter: {res}");
                    }) as Box<dyn FnMut()>)
                };
                reader.set_onload(Some(onload.as_ref().unchecked_ref()));
                reader.read_as_data_url(&file).unwrap();
                onload.forget();
            }
        }
    };

    // Handle drop
    let UseDropZoneReturn { .. } = use_drop_zone_with_options(
        drop_zone_el,
        UseDropZoneOptions::default()
            .on_enter({
                let set_kanban = set_kanban.clone();
                move |_| set_load_file_text.set(DEFAULT_TEXT_DRAG)
            })
            .on_leave({
                let set_kanban = set_kanban.clone();
                move |_| set_load_file_text.set(DEFAULT_TEXT)
            })
            .on_drop(move |e| {
                if let Some(file) = e.files.first() {
                    handle_upload_file(file.clone());
                }
            }),
    );

    let handle_close = {
        let set_kanban = set_kanban.clone();
        move || {
            set_kanban.update(|s| {
                s.card_title(id, title.get_untracked());
                s.card_description(id, description.get_untracked());
                s.card_image(id, src_img.get_untracked());
                s.card_is_cover(id, covered_img.get_untracked());
            });
            close_details()
        }
    };
    on_click_outside(target, move |_| {
        handle_close();
    });

    view! {
    <div
      class=uno!["fixed w-screen h-screen flex justify-center items-center inset-1/2 transform -translate-x-1/2 -translate-y-1/2 "]
    >
      <div
        class=uno![
            "absolute w-screen h-screen flex justify-center items-center left-0 top-0 bg-[#00000080] cursor-pointer",
            "bg-[rgba(255, 255, 255, 0.26)] backdrop-blur-[11.2px]"
        ]
      />
      <div node_ref=target class=uno!["w-fit min-w-[500px] z-[999] flex flex-col gap-y-4 p-4 bg-mainBackgroundColor border-2 border-columnBackgroundColor rounded-md"]>
        <div style="width: fit-content" on:click=move |_| handle_close()>
            <X class=uno!["text-customWhite cursor-pointer"] />
        </div>

        <label class=uno!["w-full flex items-center"]>
          <input
            prop:value=title.clone()
            on:change=move |e| set_title(event_target_value(&e))
            class=uno!["bg-transparent rounded-[4px] mr-2 px-2 pt-2 flex-grow"]
          />
        </label>
        <label>
          <textarea
            prop:value=description()
            on:change=move |e| set_description(event_target_value(&e))
            class=uno!["bg-[#1E2733] p-4 rounded-[4px] text-customWhite h-[100px] w-full"]
          />
        </label>
        <div>
          {move || if !src_img().is_empty() {
            view! {
              <div class=uno!["relative w-fit"]>
                <img
                  src=src_img
                  alt=format!("img-{}", title())
                  class=uno!["max-w-[200px] mt-4 aspect-w-16 aspect-h-9 rounded-md object-cover"]
                />
                <span class=uno!["flex text-xs items-center bg-red-5 w-fit p-1 rounded-md absolute top-[-10px] right-[-10px] cursor-pointer"]
                  on:click=move |_| set_src_img.set(String::new())
                >
                  <X size=16 />
                </span>
              </div>
              <input
                type="checkbox"
                id="cover"
                checked=img_covered
                on:change=move |e| set_covered_img(event_target_checked(&e))
              />
              <label for="cover" class=uno!["ml-2 text-xs"]>
                Put image as cover
              </label>
            }
          } else {
            view!{
              <label
                for="file-upload"
                node_ref=drop_zone_el
                class=uno!["flex items-center h-20 gap-2 p-4 rounded-md border-2 border-dashed border-columnBackgroundColor cursor-pointer"]
              >
                <Image />
                <span class=uno!["pointer-events-none"]>{load_file_text}</span>
              </label>
              <input
                node_ref=input_file_ref
                type="file"
                id="file-upload"
                prop:accept="image/*"
                class=uno!["hidden"]
                on:change=move |_| {
                    if let Some(files) = input_file_ref.get() {
                        if let Some(files) = files.files() {
                            if files.length() > 0 {
                                handle_upload_file(files.get(0).unwrap());
                            } else {
                                log::warn!("Files selected is empty");
                            }
                        } else {
                            log::warn!("Cannot get files");
                        }
                    } 
                }
                />
            }
          }}
        </div>
      </div>
    </div>
    }
}
