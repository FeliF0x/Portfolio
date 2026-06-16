const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar li a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// Initialisation de Particles.js
particlesJS('particles-js', {
    "particles": {
      "number": {
        "value": 100, // Nombre de particules
        "density": {
          "enable": true,
          "value_area": 1000 // Zone où les particules seront présentes
        }
      },
      "color": {
        "value": "#fff" // Couleur des particules
      },
      "shape": {
        "type": "circle", // Forme des particules
        "stroke": {
          "width": 1,
          "color": "#fff"
        }
      },
      "opacity": {
        "value": 0.5, // Opacité des particules
        "random": true,
        "anim": {
          "enable": true,
          "speed": 1,
          "opacity_min": 0.1
        }
      },
      "size": {
        "value": 5, // Taille des particules
        "random": true,
        "anim": {
          "enable": true,
          "speed": 1,
          "size_min": 0.1
        }
      },
      "line_linked": {
        "enable": false, // Relier les particules avec des lignes
        "distance": 150,
        "color": "#fff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1, // Vitesse de mouvement des particules
        "direction": "top",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "window",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "repulse" // Interaction de repulsion sur hover
        },
        "onclick": {
          "enable": false,
          "mode": "push" // Interaction pour ajouter des particules au clic
        }
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 0.8,
          "speed": 3
        },
        "repulse": {
          "distance": 100
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });

  (function() {
    const seabed = document.getElementById('seabed');
    const grassCount = 100; // Number of grass blades

    for (let i = 0; i < grassCount; i++) {
        const blade = document.createElement('div');
        blade.classList.add('grass');

        // Random position, height, and animation delay for natural look
        blade.style.left = `${Math.random() * 100}%`;
        blade.style.height = `${50 + Math.random() * 50}px`;
        blade.style.animationDuration = `${2 + Math.random() * 2}s`;
        

        seabed.appendChild(blade);
    }

    const sunRay = document.getElementById('sunRay');
    const sunRayCount = 50;

    for (let i = 0; i < sunRayCount; i++) {
        const ray = document.createElement('div');
        ray.classList.add('sun');

        // Random position, height, and animation delay for natural look
        ray.style.left = `${Math.random() * 100}%`;
        ray.style.height = `${100 + Math.random() * 500}px`;
        ray.style.width = `${4 + Math.random() * 5}px`;
        ray.style.animationDuration = `${2 + Math.random() * 2}s`;
        

        sunRay.appendChild(ray);
    }
})();

 
