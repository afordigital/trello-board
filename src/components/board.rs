use leptos::*;
use unocss_classes::uno;

use crate::components::{ColumnContainer, PlusCircle};
use crate::store::KanbanState;

#[component]
pub fn KanbanBoard() -> impl IntoView {
    let kanban_state = expect_context::<Signal<KanbanState>>();
    let set_kanban = expect_context::<WriteSignal<KanbanState>>();

    log::info!("Context get success");

    view! {
        <div class=uno!["mx-auto flex flex-1 w-full items-center overflow-x-auto px-[40px]"]>
            <div class=uno!["mx-auto flex"]>
                <div class=uno![
                    "flex gap-x-4 h-[300px] h-fit"
                ]>
                    {move || {
                        kanban_state
                            .get()
                            .columns()
                            .map(|column| view! { <ColumnContainer column=column.clone()/> })
                            .collect::<Vec<_>>()
                    }}

                </div>
                <button
                    on:click=move |_ev| set_kanban.update(|s| s.add_column())
                    class=uno![
                        "h-[60px] w-[350px] flex items-center justify-center gap-2 min-w-[350px] cursor-pointer ml-4 rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor"
                    ]
                >

                    <PlusCircle/>
                    Add column
                </button>
            </div>
        </div>
    }
}
