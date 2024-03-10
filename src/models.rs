use std::collections::HashMap;

use serde::{Deserialize, Serialize};

pub type Id = usize;

#[derive(Clone, Default, Serialize, Deserialize, PartialEq)]
pub struct Column {
    pub title: String,
    pub cards: HashMap<Id, Card>,
}

#[derive(Clone, Default, Serialize, Deserialize, PartialEq)]
pub struct Card {
    pub title: String,
    pub description: String,
    pub src_img: String,
    pub img_covered: bool,
}
