use std::ops::Not;

use leptos::*;
use unocss_classes::uno;

use crate::components::{CardContainer, CardDetails, DeleteConfirmation, GripVertical, Trash2};
use crate::models::{Card, Column};
use crate::store::KanbanState;

#[component]
pub fn ColumnContainer(#[prop(into)] column: Column) -> impl IntoView {
    let kanban_state = expect_context::<Signal<KanbanState>>();
    let set_kanban = expect_context::<WriteSignal<KanbanState>>();
    let (show_delete_confirmation, set_show_delete_confirmation) = create_signal(false);
    let (card_selected, set_card_selected) = create_signal::<Option<Card>>(None);

    let filtered_cards = {
        let kanban_state = kanban_state.clone();
        let col_id = column.id;
        create_memo(move |_| {
            kanban_state
                .get()
                .cards()
                .filter(|c| c.col_id == col_id)
                .cloned()
                .collect::<Vec<_>>()
        })
    };

    let confirmation_delete = move || {
        if !filtered_cards.get().is_empty() {
            set_show_delete_confirmation.set(true);
        } else {
            set_show_delete_confirmation.set(false);
            set_kanban.update(|s| s.delete_column(column.id));
        }
    };

    let handle_title_change = {
        let set_kanban = set_kanban.clone();
        let col_id = column.id;
        move |value: String| {
            set_kanban.update(|s| s.column_title(col_id, value));
        }
    };

    view! {
        <>
      {move || card_selected().map(|card| view! {
          <CardDetails
            close_details=move || set_card_selected(None)
            card=card.clone()
            />
      })}
        <div
          // ref={setNodeRef}
          // style={style}
          class=uno!["w-[350px] h-fit flex flex-col text-white"]
        >
          <div class=uno!["flex p-4 mb-4 h-[60px] flex items-center justify-between"]>
            <label class=uno!["flex items-center"]>
              <div class=uno!["flex-1"]>
                <input
                  type_="text"
                  value={column.title.clone()}
                  on:change=move |e| handle_title_change(event_target_value(&e))
                  class=uno!["bg-transparent"]
                />
              </div>
            </label>
            <div class=uno!["flex gap-x-2 items-center"]>
              {move || filtered_cards().is_empty().not().then_some(view!{
                  <p class=uno!["bg-slate-7 w-[20px] h-[20px] text-sm text-center rounded-full"]>
                  {filtered_cards().len()}
                  </p>
                })
              }
              <button
                on:click=move |_| confirmation_delete()
                class=uno!["bg-transparent"]
              >
                <Trash2 size=18 />
              </button>
              <GripVertical />
            </div>
          </div>

          <div class=uno!["flex flex-col gap-y-4"]>
            <button
              on:click=move |_| set_kanban.update(|s| s.add_card(column.id))
              class=uno!["bg-slate-7 rounded-[4px] h-fit p-2"]
            >
              Add card
            </button>
            // <SortableContext items={filteredCards.map((el) => el.id)}>
              <div class=uno!["max-h-[500px] h-[500px] overflow-y-auto flex flex-col gap-3 px-1"]>
                {move || filtered_cards().iter()
                  .map(|card| view!{
                    <CardContainer
                        card=card.clone()
                        on_select=move |c| {
                            set_card_selected(Some(c));
                        }
                        />
                  }).collect::<Vec<_>>()
                }
              </div>
            // </SortableContext>
          </div>
          {move || show_delete_confirmation.get().then_some(
            view!{
              <DeleteConfirmation
                on_succes=move || set_kanban.update(|s| s.delete_column(column.id))
                on_cancel=move || set_show_delete_confirmation.set(false)
                title=format!("Delete column \"{}\"", column.title)
                message="This column has at least one card, are you sure to delete it?".to_string()
              />
            })}
        </div>
            </>
    }
}
