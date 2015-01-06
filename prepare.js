#!/usr/bin/env node

var interact = require('json-interact')

var mechanics = [
    "AdjacentBuff"
  , "AffectedBySpellPower"
  , "Aura"
  , "Battlecry"
  , "Charge"
  , "Combo"
  , "Deathrattle"
  , "Divine Shield"
  , "Enrage"
  , "Freeze"
  , "ImmuneToSpellpower"
  , "OneTurnEffect"
  , "Poisonous"
  , "Secret"
  , "Silence"
  , "Spellpower"
  , "Stealth"
  , "Summoned"
  , "Taunt"
  , "Windfury"
]

var rarities = {
  "Common": 1
, "Rare": 2
, "Epic": 3
, "Legendary": 4
}

var skipType = [
  "Enchantment"
, "Hero Power"
, "Hero"
]

function contains(obj, mechanic) {
  if (!obj.mechanics) return 0;
  return obj.mechanics.indexOf(mechanic) >= 0 ? 1 : 0
}

interact(function(obj, done){
  var skip = skipType.indexOf(obj.type) >= 0 
              || obj.type !== "Minion"
  if (skip) return done()

  mechanics.forEach(function(mechanic){
    var key = mechanic.replace(" ", "").toLowerCase()
    var val = contains(obj, mechanic)
    obj[key] = val
  });

  obj.race = obj.race || "None"
  obj.faction = obj.faction || "None"
//obj.attack = obj.attack || 0
//obj.health = obj.health || 0
//obj.cost = obj.cost || 0

  //obj.rarity = rarities[obj.rarity] || 0;

  delete obj.type
  delete obj.elite
  delete obj.artist
  delete obj.flavor
  delete obj.id
  delete obj.mechanics
  delete obj.inPlayText
  delete obj.howToGet
  delete obj.howToGetGold
  delete obj.collectible
  delete obj.text
  delete obj.durability

  if (obj.playerClass == null) obj.playerClass = "Any"

  this.push(obj);
  done();
});
