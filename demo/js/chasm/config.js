const GameConfig = {
  "startingLocation": Places.FOREST_CLEARING,


  "items": [
    {
      "title": Items.MAPLE_TREE,
      "props": {
        "commonTitle": "tree",
        "longDescription": "You see a tall maple tree with a thick trunk and visible roots.",
        "hideFromList": true
      },
      "features": {
        "take": false,
        "get": false,
        "pick up": false
      }
    },
    {
      "type": "Container",
      "title": Items.TOOLBOX,
      "props": {
        "commonTitle": "toolbox",
        "longDescription": "A small red toolbox is rusty with a clasp on the front and a handle on top.",
        "opened": false
      },
      "items": [
        {
          "title": Items.SILVER_KEY,
          "props": {
            "commonTitle": "key",
            "longDescription": "The small key is made of silver and has teeth along one edge. The handle is ornate with an etching of a sparrow."
          }
        }
      ]
    },
    {
      "type": "Container",
      "title": Items.WOODEN_CHEST,
      "props": {
        "commonTitle": "chest",
        "longDescription": "The chest is made of oak and has silver trim. On the lid, there is a beautifully carved sparrow.",
        "opened": false,
        "locked": true
      },
      "features": {
        "lock": [Items.SILVER_KEY],
        "unlock": [Items.SILVER_KEY],
        "take": false
      },
      "items": [
        {
          "title": Items.ROPE,
          "props": {
            "longDescription": "A long and thick length of woven cabled rope, capable of supporting significant weight.",
          },
          "features": {
            "tie": [Items.MAPLE_TREE],
            "untie": [Items.MAPLE_TREE]
          }
        }
      ]
    }
  ],


  "places": [
    {
      "title": Places.FOREST_CLEARING,
      "description": "You are standing in a forest clearing with a path leading to the east where you see a rocky mountainside. There is a small shed here to the north. All other directions are impassable.",
      "items": [Items.WOODEN_CHEST, Items.SILVER_KEY]
    },
    {
      "title": Places.CHASM_ENTRANCE,
      "description": "You are standing at the entrance to a chasm which appears to be a straight drop. There is a maple tree here.",
      "items": [Items.MAPLE_TREE]
    },
    {
      "title": Places.NARROW_PASSAGE,
      "description": "You begin your descent through the crack in the mountainside. It's a pretty tight fit, but you manage."
    },
    {
      "title": Places.SHED,
      "description": "You are inside a Shed. There are mostly useless items here.",
      "items": [Items.TOOLBOX]
    },
    {
      "title": Places.TROLL_ARMOURY,
      "description": "You are inside the troll's armoury. From the appearence of the place, you can tell the trolls left rather hastily."
    },
    {
      "title": Places.TROLL_KITCHEN,
      "description": "You are in a kitchen."
    },
    {
      "title": Places.TROLL_ROOM,
      "description": "You are in the Troll's Room. It's dark and smelly. There is a metal door to the south and a wooden door to the west. There is a slight foul odor stronger on the west side of the room."
    }
  ],


  "exits": [
    {
      "type": "DooredExit",
      "title": Exits.SHED_DOOR,
      "places": [
        {"dir": "n", "place": Places.SHED},
        {"dir": "s", "place": Places.FOREST_CLEARING}
      ]
    },
    {
      "type": "Exit",
      "title": Exits.FOREST2CHASM,
      "places": [
        {"dir": "e", "place": Places.CHASM_ENTRANCE},
        {"dir": "w", "place": Places.FOREST_CLEARING}
      ]
    },
    {
      "type": "Exit",
      "title": Exits.CHASM2PASSGE,
      "blocked": true,
      "places": [
        {"dir": "d", "place": Places.NARROW_PASSAGE},
        {"dir": "u", "place": Places.CHASM_ENTRANCE}
      ]
    },
    {
      "type": "Exit",
      "title": Exits.PASSGE2TROLLRM,
      "places": [
        {"dir": "d", "place": Places.TROLL_ROOM},
        {"dir": "u", "place": Places.NARROW_PASSAGE}
      ]
    },
    {
      "type": "DooredExit",
      "title": Exits.WOODEN_DOOR,
      "places": [
        {"dir": "e", "place": Places.TROLL_ROOM},
        {"dir": "w", "place": Places.TROLL_KITCHEN}
      ]
    },
    {
      "type": "DooredExit",
      "title": Exits.METAL_DOOR,
      "places": [
        {"dir": "n", "place": Places.TROLL_ROOM},
        {"dir": "s", "place": Places.TROLL_ARMOURY}
      ]
    }
  ],

  
  "points": { 
    [`unlock/${Items.WOODEN_CHEST}/${Items.SILVER_KEY}`]: 10,
    [`tie/${Items.ROPE}/${Items.MAPLE_TREE}`]: 5
  }
};