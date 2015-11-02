const GameConfig = {
  "startingLocation": Places.FOREST_CLEARING,
  "items": [

  ],
  "places": [
    {
      "title": Places.FOREST_CLEARING,
      "description": "You are standing in a forest clearing with a path leading to the east where you see a rocky mountainside. There is a small shed here to the north. All other dirs are impassable."
    },
    {
      "title": Places.CHASM_ENTRANCE,
      "description": "You are standing at the entrance to a chasm which appears to be a straight drop. There is a maple tree here."
    },
    {
      "title": Places.NARROW_PASSAGE,
      "description": "You begin your descent through the crack in the mountainside. It's a pretty tight fit, but you manage."
    },
    {
      "title": Places.SHED,
      "description": "You are inside a Shed. There are mostly useless items here."
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
  ]
};