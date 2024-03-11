use leptos::*;
use unocss_classes::uno;

#[component]
pub fn DeleteConfirmation<F, F1>(
    title: String,
    message: String,
    on_cancel: F,
    on_succes: F1,
) -> impl IntoView
where
    F: Fn() + 'static,
    F1: Fn() + 'static,
{
    let cancel = move |_| {
        on_cancel();
    };
    let success = move |_| {
        on_succes();
    };

    view! {
        <div
          id="card-container"
          class=uno!["fixed w-screen h-screen flex justify-center items-center inset-1/2 transform -translate-x-1/2 -translate-y-1/2"]
        >
          <div class=uno!["absolute w-screen h-screen flex justify-center items-center left-0 top-0"]>
            <div class=uno!["w-fit min-w-[500px] z-1 flex flex-col gap-y-4 p-4 py-8 rounded bg-mainBackgroundColor border-2 border-columnBackgroundColor"]>
              <div class=uno!["mb-2"]>
                <h2 class=uno!["text-red-500 bold text-xl mb-2"]>{title}</h2>
                <p>{message}</p>
              </div>
              <footer class=uno!["flex gap-x-4 justify-end"]>
                <button class=uno!["bg-red-8 rounded-[4px] h-fit p-2"] on:click=success>yes, delete</button>
                <button class=uno!["bg-slate-7 rounded-[4px] h-fit p-2"] on:click=cancel>no, Cancel</button>
              </footer>
            </div>
          </div>
        </div>
    }
}
