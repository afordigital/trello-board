use leptos::{component, view, IntoView};

#[component]
pub fn X(
    #[prop(default = 24)] size: u32,
    #[prop(default = String::new())] class: String,
    ) -> impl IntoView {
    view! {
        <svg
            width=size
            height=size
            class=class
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
        </svg>
    }
}
