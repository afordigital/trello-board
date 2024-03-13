use leptos::html::Div;
use leptos::*;
use leptos_use::on_click_outside;
use unocss_classes::uno;

#[component]
pub fn DeleteConfirmation<F, F1>(
    title: String,
    message: String,
    on_cancel: F,
    on_succes: F1,
) -> impl IntoView
where
    F: Fn() + Copy + 'static,
    F1: Fn() + 'static,
{
    let target = create_node_ref::<Div>();
    let _ = on_click_outside(target, move |_| {
        on_cancel();
    });

    let success = move |_| {
        on_succes();
    };

    view! {
        <div class=uno![
            "fixed w-screen h-screen flex justify-center items-center inset-1/2 transform -translate-x-1/2 -translate-y-1/2",
            "bg-[rgba(255, 255, 255, 0.26)] backdrop-blur-[11.2px]"
        ]>

            <div class=uno![
                "absolute w-screen h-screen flex justify-center items-center left-0 top-0"
            ]>
                <div
                    node_ref=target
                    class=uno![
                        "w-fit min-w-[500px] z-1 flex flex-col gap-y-4 p-4 py-8 rounded bg-mainBackgroundColor border-2 border-columnBackgroundColor"
                    ]
                >

                    <div class=uno!["mb-2"]>
                        <h2 class=uno!["text-red-500 bold text-xl mb-2"]>{title}</h2>
                        <p>{message}</p>
                    </div>
                    <footer class=uno!["flex gap-x-4 justify-end"]>
                        <button class=uno!["bg-red-8 rounded-[4px] h-fit p-2"] on:click=success>
                            yes, delete
                        </button>
                        <button
                            class=uno!["bg-slate-7 rounded-[4px] h-fit p-2"]
                            on:click=move |_| on_cancel()
                        >
                            no, Cancel
                        </button>
                    </footer>
                </div>
            </div>
        </div>
    }
}
