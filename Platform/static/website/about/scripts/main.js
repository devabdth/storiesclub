const toggleUsersSection= ()=> {
  const p= document.getElementById('users-p');
  if (p.style.display === "none") {
    p.style.display= "flex";
    return
  }
    p.style.display= "none";
}

const toggleCreatorsSection= ()=> {
  const p= document.getElementById('creators-p');
  if (p.style.display === "none") {
    p.style.display= "flex";
    return
  }
    p.style.display= "none";
}

const togglePublishingHousesSection= ()=> {
  const p= document.getElementById('publish-houses-p');
  if (p.style.display === "none") {
    p.style.display= "flex";
    return
  }
    p.style.display= "none";
}

const toggleSuppliersSection= ()=> {
  const p= document.getElementById('suppliers-p');
  if (p.style.display === "none") {
    p.style.display= "flex";
    return
  }
    p.style.display= "none";
}