const dinos = [{
    "species": "Triceratops",
    "weight": 13000,
    "height": 114,
    "diet": "herbavor",
    "where": "North America",
    "when": "Late Cretaceous",
    "fact": "First discovered in 1889 by Othniel Charles Marsh",
    "image": "images/triceratops.png"
  },
  {
    "species": "Tyrannosaurus Rex",
    "weight": 11905,
    "height": 144,
    "diet": "carnivor",
    "where": "North America",
    "when": "Late Cretaceous",
    "fact": "The largest known skull measures in at 5 feet long.",
    "image": "images/tyrannosaurus rex.png"
  },
  {
    "species": "Anklyosaurus",
    "weight": 10500,
    "height": 55,
    "diet": "herbavor",
    "where": "North America",
    "when": "Late Cretaceous",
    "fact": "Anklyosaurus survived for approximately 135 million years.",
    "image": "images/anklyosaurus.png"
  },
  {
    "species": "Brachiosaurus",
    "weight": 70000,
    "height": "372",
    "diet": "herbavor",
    "where": "North America",
    "when": "Late Jurasic",
    "fact": "An asteroid was named 9954 Brachiosaurus in 1991.",
    "image": "images/brachiosaurus.png"
  },
  {
    "species": "Stegosaurus",
    "weight": 11600,
    "height": 79,
    "diet": "herbavor",
    "where": "North America, Europe, Asia",
    "when": "Late Jurasic to Early Cretaceous",
    "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines.",
    "image": "images/stegosaurus.png"
  },
  {
    "species": "Elasmosaurus",
    "weight": 16000,
    "height": 59,
    "diet": "carnivor",
    "where": "North America",
    "when": "Late Cretaceous",
    "fact": "Elasmosaurus was a marine reptile first discovered in Kansas.",
    "image": "images/elasmosaurus.png"
  },
  {
    "species": "Pteranodon",
    "weight": 44,
    "height": 20,
    "diet": "carnivor",
    "where": "North America",
    "when": "Late Cretaceous",
    "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur.",
    "image": "images/pteranodon.png"
  },
  {
    "species": "Pigeon",
    "weight": 0.5,
    "height": 9,
    "diet": "herbavor",
    "where": "World Wide",
    "when": "Holocene",
    "fact": "All birds are living dinosaurs.",
    "image": "images/pigeon.png"
  }
];

const toDOM = function(h3Content, imagePath, pContent, classList = []) {
  const div = document.createElement("div");
  const h2 = document.createElement("h3");
  const img = document.createElement("img");
  const p = document.createElement("p");
  div.classList.add(...classList);

  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)

  h2.textContent = h3Content;
  img.alt = h3Content;
  img.src = imagePath;
  p.textContent = pContent;

  return div;
}

const toInfoGraphicDOM = function() {
  return toDOM(this.name, this.image, this.fact, ["grid-item", ...this.classList]);
}

const toHeightComparisonDOM = function(withDom = 11.11) {
  const dom = toDOM(this.name || this.species, this.image, this.height + " feet", ["height-item", ...this.classList]);
  dom.style.width = withDom + "%";
  return dom;
}

const toWeightComparisonDOM = function(withDom = 100 / 9) {
  const dom = toDOM(this.name || this.species, this.image, this.weight + " lbs", ["weight-item", ...this.classList]);
  dom.style.width = withDom + "%";
  return dom;
}

const toDietComparisonDOM = function() {
  return toDOM(this.name || this.species, this.image, this.diet, ["diet-item", ...this.classList, this.diet.toLowerCase()]);
}

// Create Dino Objects
function Dinosaurs(data, classList = ["dinosaurs"]) {
  return {
    species: data.species,
    weight: parseFloat(data.weight) || 0,
    height: parseFloat(data.height) || 0,
    diet: data.diet,
    where: data.where,
    when: data.when,
    fact: data.fact,
    image: data.image,
    classList: classList,
    toInfoGraphicDOM: toInfoGraphicDOM,
    toHeightComparisonDOM: toHeightComparisonDOM,
    toWeightComparisonDOM: toWeightComparisonDOM,
    toDietComparisonDOM: toDietComparisonDOM,
  }
}

// Create Human Object
function Human(name, weight, height, diet, classList = ["human"]) {
  return {
    name: name,
    weight: parseFloat(weight) || 0,
    height: parseFloat(height) || 0,
    diet: diet,
    where: "Mars",
    when: "World Wide",
    fact: "",
    image: "images/human.png",
    classList: classList,
    toInfoGraphicDOM: toInfoGraphicDOM,
    toHeightComparisonDOM: toHeightComparisonDOM,
    toWeightComparisonDOM: toWeightComparisonDOM,
    toDietComparisonDOM: toDietComparisonDOM,
  }
}

const form = document.getElementById("dino-compare");

// On form submit, prepare and display infographic
form.addEventListener("submit", function(event) {
  const name = form.name.value;
  const height = form.feet.value + "." + form.inches.value;
  const weight = form.weight.value;
  const diet = form.diet.value;

  // Remove form from screen
  form.parentNode.removeChild(form);
  event.preventDefault();

  const human = Human(name, weight, height, diet);

  // display infographic
  const infographic = generateInfographic(human);
  heightComparison(infographic);
  weightComparison(infographic);
  dietComparison(infographic);
})

// Generate Tiles for each Dino in Array
function generateInfographic(human) {
  const main = document.getElementById("grid");

  const infographic = [];
  dinos.forEach(e => {
    infographic.push(Dinosaurs(e));
  });

  // shuffle
  infographic.sort(() => Math.random() - 0.5);

  infographic.splice(4, 0, human);
  infographic.forEach(e => {
    main.appendChild(e.toInfoGraphicDOM());
  });

  return infographic;
}

// Create Dino Compare Method 1
const heightComparison = function(infographic) {
  document.getElementById("different-height-title").style.display = "initial";
  const differentHeight = document.getElementById("different-height");

  const totalHeight = infographic.reduce((p, c) => p + c.height, 0);

  infographic.sort((a, b) => a.height - b.height);
  infographic.forEach(e => {
    differentHeight.appendChild(e.toHeightComparisonDOM(e.height * 100.0 / totalHeight));
  });
}

// Create Dino Compare Method 2
const weightComparison = function(infographic) {
  document.getElementById("different-weight-title").style.display = "initial";
  const differentHeight = document.getElementById("different-weight");

  const totalWeight = infographic.reduce((p, c) => p + c.weight, 0);

  infographic.sort((a, b) => a.weight - b.weight);
  infographic.forEach(e => {
    differentHeight.appendChild(e.toWeightComparisonDOM(e.weight * 100.0 / totalWeight));
  });
}

// Create Dino Compare Method 3
const dietComparison = function(infographic) {
  document.getElementById("different-diet-title").style.display = "initial";
  const differentHeight = document.getElementById("different-diet");

  infographic.sort((a, b) => {
    const aDiet = a.diet.toLowerCase();
    const bDiet = b.diet.toLowerCase();
    if (aDiet === bDiet) return 0;
    if (aDiet < bDiet) return -1;
    if (aDiet > bDiet) return 1;
  });
  infographic.forEach(e => {
    differentHeight.appendChild(e.toDietComparisonDOM());
  });
}