use leptos::*;
use leptos_meta::*;
use unocss_classes::uno;

use crate::components::{KanbanBoard, LayoutPanelTop};
use crate::store::KanbanProvider;

#[component]
pub fn App() -> impl IntoView {
    // Provides context that manages stylesheets, titles, meta tags, etc.
    provide_meta_context();

    view! {
        // content for this welcome page
        <main class=uno!["bg-[#050505] w-full h-full min-h-screen font-onest flex flex-col items-center text-customWhite"]>
            <h1 class=uno!["text-[#485E7A] py-10 text-2xl font-bold flex items-center justify-center"]>
                <LayoutPanelTop class="mr-2" />
                Trello Board
            </h1>
            <KanbanProvider>
                <KanbanBoard />
            </KanbanProvider>
        </main>
    }
}
