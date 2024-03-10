use crate::app::App;
use leptos::*;

mod app;
mod components;

fn main() {
    console_error_panic_hook::set_once();

    mount_to_body(App);
}
