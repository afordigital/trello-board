use leptos::{component, view, IntoView};

#[component]
pub fn LayoutPanelTop(
    #[prop(default = 24)] size: u32,
    #[prop(default = "")] class: &'static str,
    ) -> impl IntoView {
    view! {
        <svg
            width=size
            height=size
            viewBox="0 0 24 24"
            class=class
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <rect width="18" height="7" x="3" y="3" rx="1"/>
            <rect width="7" height="7" x="3" y="14" rx="1"/>
            <rect width="7" height="7" x="14" y="14" rx="1"/>
        </svg>
    }
}