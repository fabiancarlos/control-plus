import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    const currentlyActive = document.querySelector(".active");
    const elementsDiv = document.querySelector("#navbar-elements");
    const list = document.querySelectorAll('.list');
    const indicator = document.getElementById('indicator');
    const correct_pos = window.innerWidth < 600 ? 35 : 30;
    let last_target = null;

    const focusIndicator = () => {
      if (currentlyActive) {
        let left_pos = currentlyActive.offsetLeft;

        indicator.style.transform = `translateX(calc(${left_pos - correct_pos}px))`;
      }
    }
    focusIndicator();

    elementsDiv.addEventListener('mouseout', () => {
      list.forEach((item) => {
        item.classList.remove('active')
      });

      if (currentlyActive) {
        currentlyActive.classList.add('active');
        focusIndicator();
      } else {
        // FAQ, ABOUT, RECURSOS
        last_target.classList.add('active');
      }
    });

    const activeLink = (event) => {
      let left_pos = event.currentTarget.offsetLeft;
      last_target = event.currentTarget;

      indicator.style.transform = `translateX(calc(${left_pos - correct_pos}px))`;

      list.forEach((item) => item.classList.remove('active'));
      event.currentTarget.classList.add('active');
    }
    list.forEach((item) =>
        item.addEventListener('mouseover', activeLink))
  }    
}
