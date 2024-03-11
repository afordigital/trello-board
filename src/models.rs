use std::collections::HashMap;

use serde::{Deserialize, Serialize};

pub type Id = usize;

#[derive(Clone, Serialize, Deserialize, PartialEq)]
pub struct Column {
    pub id: Id,
    pub title: String,
}

#[derive(Clone, Default, Serialize, Deserialize, PartialEq)]
pub struct Card {
    pub id: Id,
    pub col_id: Id,
    pub title: String,
    pub description: String,
    pub src_img: String,
    pub img_covered: bool,
}

impl Column {
    pub fn new(id: Id) -> Self {
        Self {
            id,
            title: format!("Column {id}"),
        }
    }
}

impl Card {
    pub fn new(id: Id, col_id: Id) -> Self {
        Self {
            id,
            col_id,
            ..Default::default()
        }
    }
}
