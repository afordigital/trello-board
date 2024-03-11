use leptos::html::Div;
use leptos::*;
use leptos_use::{use_drop_zone_with_options, UseDropZoneOptions, UseDropZoneReturn};
use unocss_classes::uno;
use web_sys::InputEvent;

use crate::components::{GripVertical, Minus};
use crate::models::Card;
use crate::store::KanbanState;

#[component]
pub fn CardContainer(card: Card) -> impl IntoView {
    let Card {
        id,
        col_id,
        title,
        description,
        src_img,
        img_covered,
    } = card;
    let drop_zone_el = create_node_ref::<Div>();
    let set_kanban = expect_context::<WriteSignal<KanbanState>>();

    let on_drop = |event| {};

    let UseDropZoneReturn {
        is_over_drop_zone, ..
    } = use_drop_zone_with_options(drop_zone_el, UseDropZoneOptions::default().on_drop(on_drop));

    let delete_card = {
        let set_kanban = set_kanban.clone();
        move || set_kanban.update(|s| s.delete_card(id))
    };

    let handle_title_change = {
        let set_kanban = set_kanban.clone();
        move |value: String| {
            set_kanban.update(|s| s.card_title(id, value));
        }
    };

    view! {
    <>
      // {isOpened && (
      //     <CardDetail
      //       closeDetails={closeDetails}
      //       card={props.card}
      //       />
      // )}
      <div
        // ref_node={setNodeRef}
        // style={style}
        //onClick={(e: React.MouseEvent<HTMLInputElement>) => {
        //  if ((e.target as HTMLInputElement).id === "input-name") return
        //  setIsOpened(true)
        //}}
        //onDrop={(e) => {
        //  e.preventDefault()
        //  e.stopPropagation()
        //  if (e.dataTransfer.files) handleUploadImage(e.dataTransfer.files)
        //}}
        class=uno!["h-18 w-full gap-y-4 p-x-2 overflow-y-auto bg-mainBackgroundColor border-2 border-columnBackgroundColor rounded-md flex flex-col justify-center text-white cursor-pointer"]
      >
        <label class=uno!["w-full flex h-fit items-center gap-2"]>
          {(img_covered && !src_img.is_empty()).then_some(view! {
            <img
              src=src_img
              alt="Image Preview"
              class=uno!["w-[50px] h-fit object-cover rounded-md"]
            />
          })}
          <input
            value={title}
            on:change=move |e| handle_title_change(event_target_value(&e))
            class=uno!["bg-transparent rounded-[4px] flex-grow"]
          />
          <span class=uno!["flex gap-2"]>
            <div class=uno!["cursor-pointer"]>
              <Minus on:click=move |_| delete_card() />
            </div>
            <GripVertical  />
          </span>
        </label>

      </div>
    </>
    }
}
