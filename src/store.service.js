function generateProducts() {
  const skills = ['JavaScript', 'CSS', 'SASS', 'VueJS', 'Angular 2', 'NodeJS'];
  return skills.map(( skill, i ) => {
    return {
      id         : i,
      title      : `Mastering ${skill}`,
      description: `${skill} ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.`,
      price      : ( (i + 1) * 10 ),
      quantity   : 0
    }
  });
}

function getProducts() {
  return new Promise(( resolve, reject ) => {
    setTimeout(() => {
      resolve(generateProducts());
    }, 2000);
  });
}

export default  {
  getProducts
}
