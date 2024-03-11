use leptos::{component, view, IntoView};

#[component]
pub fn Minus(
    #[prop(default = 24)] size: u32,
    ) -> impl IntoView {
    view! {
        <svg
            width=size
            height=size
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M5 12h14"/>
        </svg>
    }
}
