use leptos::{component, view, IntoView};

#[component]
pub fn PlusCircle(
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
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 12h8"/>
            <path d="M12 8v8"/>
        </svg>
    }
}
