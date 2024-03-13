use leptos::{component, provide_context, run_as_child, Children, IntoView};
use leptos_use::storage::{use_local_storage_with_options, UseStorageOptions};
use leptos_use::utils::JsonCodec;
use serde::{Deserialize, Serialize};

use crate::models::{Card, Column, Id};

#[derive(Clone, Default, Serialize, Deserialize, PartialEq)]
pub struct KanbanState {
    col_index: usize,
    card_index: usize,
    columns: Vec<Column>,
    cards: Vec<Card>,
}

impl KanbanState {
    pub fn add_column(&mut self) {
        self.col_index += 1;
        let n = self.columns.len();
        self.columns.push(Column::new(n, self.col_index));
    }
    pub fn column_title(&mut self, col_id: Id, title: String) {
        if let Some(col) = self.columns.iter_mut().find(|col| col.id == col_id) {
            col.title = title;
        }
    }
    pub fn delete_column(&mut self, id: Id) {
        if let Some(i) = self.columns.iter().position(|col| col.id == id) {
            while let Some(i) = self.cards().position(|card| card.col_id == id) {
                self.cards.remove(i);
            }
            self.columns.remove(i);
        }
    }
    pub fn add_card(&mut self, col_id: Id) {
        self.card_index += 1;
        self.cards.push(Card::new(self.card_index, col_id));
    }
    pub fn delete_card(&mut self, id: Id) {
        if let Some(i) = self.cards.iter().position(|col| col.id == id) {
            self.cards.remove(i);
        }
    }
    pub fn card_image(&mut self, id: Id, image: String) {
        if let Some(i) = self.cards.iter().position(|c| c.id == id) {
            let card = self.cards.get_mut(i).unwrap();
            card.src_img = image.clone();
        }
    }
    pub fn card_title(&mut self, id: Id, title: String) {
        if let Some(i) = self.cards.iter().position(|c| c.id == id) {
            let card = self.cards.get_mut(i).unwrap();
            card.title = title.clone();
        }
    }
    pub fn card_description(&mut self, id: Id, description: String) {
        if let Some(i) = self.cards.iter().position(|c| c.id == id) {
            let card = self.cards.get_mut(i).unwrap();
            card.description = description.clone();
        }
    }
    pub fn card_is_cover(&mut self, id: Id, state: bool) {
        if let Some(i) = self.cards.iter().position(|c| c.id == id) {
            let card = self.cards.get_mut(i).unwrap();
            card.img_covered = state;
        }
    }

    pub fn columns(&self) -> std::slice::Iter<'_, Column> {
        self.columns.iter()
    }

    pub fn cards(&self) -> std::slice::Iter<'_, Card> {
        self.cards.iter()
    }
}

#[component]
pub fn KanbanProvider(children: Children) -> impl IntoView {
    let (state, set_state, _remove_flag) = use_local_storage_with_options::<KanbanState, JsonCodec>(
        "kanban",
        UseStorageOptions::default(),
    );

    run_as_child(move || {
        provide_context(state);
        provide_context(set_state);
        children()
    })
}
