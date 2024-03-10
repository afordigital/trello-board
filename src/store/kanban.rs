use std::collections::HashMap;

use leptos::{SignalGet, SignalUpdate, WriteSignal};
use leptos_use::storage::{use_local_storage_with_options, UseStorageOptions};
use leptos_use::utils::JsonCodec;
use serde::{Deserialize, Serialize};

use crate::models::{Card, Column, Id};

pub struct StateWraper {
    pub state: State,
    pub add_column: Box<dyn Fn()>,
    pub edit_column_title: Box<dyn Fn(usize, String)>,
    pub delete_column: Box<dyn Fn(Id)>,
    pub add_card: Box<dyn Fn(Id)>,
    pub delete_card: Box<dyn Fn(Id)>,
    pub add_card_image: Box<dyn Fn(Id, String)>,
    pub edit_card_title: Box<dyn Fn(Id, String)>,
    pub edit_card_description: Box<dyn Fn(Id, String)>,
    pub edit_card_is_cover: Box<dyn Fn(Id, bool)>,
}

#[derive(Clone, Default, Serialize, Deserialize, PartialEq)]
pub struct State {
    columns: HashMap<Id, Column>,
}

impl State {
    pub fn add_column(&mut self) {
        let n = self.columns.keys().len();
        self.columns.entry(n).or_insert(Column::default());
    }
    pub fn edit_column_title(&mut self, col_id: Id, title: String) {
        self.columns.entry(col_id).and_modify(|col| {
            col.title = title;
        });
    }
    pub fn delete_column(&mut self, id: Id) {
        self.columns.remove(&id).unwrap();
    }
    pub fn add_card(&mut self, col_id: Id) {
        self.columns.entry(col_id).and_modify(|col| {
            let n = col.cards.keys().len();
            col.cards.insert(n, Card::default());
        });
    }
    pub fn delete_card(&mut self, id: Id) {
        for (_, col) in self.columns.iter_mut() {
            if col.cards.remove(&id).is_some() {
                break;
            }
        }
    }
    pub fn add_card_image(&mut self, id: Id, image: String) {
        for (_, col) in self.columns.iter_mut() {
            if let Some(card) = col.cards.get_mut(&id) {
                card.src_img = image.clone();
                break;
            }
        }
    }
    pub fn edit_card_title(&mut self, id: Id, title: String) {
        for (_, col) in self.columns.iter_mut() {
            if let Some(card) = col.cards.get_mut(&id) {
                card.title = title.clone();
                break;
            }
        }
    }
    pub fn edit_card_description(&mut self, id: Id, description: String) {
        for (_, col) in self.columns.iter_mut() {
            if let Some(card) = col.cards.get_mut(&id) {
                card.description = description.clone();
                break;
            }
        }
    }
    pub fn edit_card_is_cover(&mut self, id: Id, state: bool) {
        for (_, col) in self.columns.iter_mut() {
            if let Some(card) = col.cards.get_mut(&id) {
                card.img_covered = state;
                break;
            }
        }
    }
}

pub fn use_kanban() -> StateWraper {
    let (state, set_state, _remove_flag) =
        use_local_storage_with_options::<State, JsonCodec>("kanban", UseStorageOptions::default());

    let add_column = {
        let set_state = set_state.clone();
        move || {
            set_state.update(|k| k.add_column());
        }
    };
    let edit_column_title = {
        let set_state = set_state.clone();
        move |col_id: Id, title: String| {
            set_state.update(|k| k.edit_column_title(col_id, title));
        }
    };
    let delete_column = {
        let set_state = set_state.clone();
        move |id: Id| {
            set_state.update(|k| k.delete_column(id));
        }
    };
    let add_card = {
        let set_state = set_state.clone();
        move |col_id: Id| {
            set_state.update(|k| k.add_card(col_id));
        }
    };
    let delete_card = {
        let set_state = set_state.clone();
        move |id: Id| {
            set_state.update(|k| k.delete_card(id));
        }
    };
    let add_card_image = {
        let set_state = set_state.clone();
        move |id: Id, image: String| {
            set_state.update(|k| k.add_card_image(id, image));
        }
    };
    let edit_card_title = {
        let set_state = set_state.clone();
        move |id: Id, title: String| {
            set_state.update(|k| k.edit_card_title(id, title));
        }
    };
    let edit_card_description = {
        let set_state = set_state.clone();
        move |id: Id, description: String| {
            set_state.update(|k| k.edit_card_description(id, description));
        }
    };
    let edit_card_is_cover = {
        let set_state = set_state.clone();
        move |id: Id, state: bool| {
            set_state.update(|k| k.edit_card_is_cover(id, state));
        }
    };

    StateWraper {
        state: state.get(),
        add_column: Box::new(add_column),
        edit_column_title: Box::new(edit_column_title),
        delete_column: Box::new(delete_column),
        add_card: Box::new(add_card),
        delete_card: Box::new(delete_card),
        add_card_image: Box::new(add_card_image),
        edit_card_title: Box::new(edit_card_title),
        edit_card_description: Box::new(edit_card_description),
        edit_card_is_cover: Box::new(edit_card_is_cover),
    }
}
