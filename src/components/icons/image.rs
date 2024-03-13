use leptos::{component, view, IntoView};

#[component]
pub fn Image(
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
            stroke-linejoin="round"
        >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
            <circle cx="9" cy="9" r="2"></circle>
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
        </svg>
    }
}
