use leptos::html::Div;
use leptos::*;
use leptos_use::utils::Pausable;
use leptos_use::{
    use_drop_zone_with_options, use_interval_fn, UseDropZoneOptions, UseDropZoneReturn,
};
use unocss_classes::uno;
use web_sys::MouseEvent;

use crate::components::{CardDetails, GripVertical, Minus};
use crate::models::Card;
use crate::store::KanbanState;

#[component]
pub fn CardContainer<F>(card: Card, on_select: F) -> impl IntoView
where
    F: Fn(Card) + Copy + 'static,
{
    let Card {
        id,
        title,
        src_img,
        img_covered,
        ..
    } = card.clone();
    let set_kanban = expect_context::<WriteSignal<KanbanState>>();

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
      <div
        // ref_node={setNodeRef}
        // style={style}
        on:click=move |_| on_select(card.clone())
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
          {move || (img_covered && !src_img.is_empty()).then_some(view! {
            <img
              src=src_img.clone()
              alt="Image Preview"
              class=uno!["w-[50px] h-fit object-cover rounded-md"]
            />
          })}
          <input
            value={title}
            on:click:undelegated= move |e| {
                e.prevent_default();
                e.stop_propagation();
            }
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
