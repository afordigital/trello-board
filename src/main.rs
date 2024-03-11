use crate::app::App;
use leptos::*;

mod app;
mod components;
mod models;
mod store;

fn main() {
    _ = console_log::init_with_level(log::Level::Debug);
    console_error_panic_hook::set_once();

    log::info!("Logger initialized");

    mount_to_body(App);
}
