document.addEventListener("DOMContentLoaded", function () {
  AFRAME.registerComponent("click-drag", {
    schema: {
      enabled: { default: true },
    },

    init: function () {
      this.mouseDown = false;
      this.originalPos = new THREE.Vector3();
      this.newPos = new THREE.Vector3();
      this.directionVec = new THREE.Vector3();
      this.el.sceneEl.addEventListener("mousedown", this.onMouseDown.bind(this));
      this.el.sceneEl.addEventListener("mouseup", this.onMouseUp.bind(this));
      this.el.sceneEl.addEventListener("mousemove", this.onMouseMove.bind(this));
    },

    onMouseDown: function (e) {
      if (!this.data.enabled) return;
      const intersection = this.getIntersection(e);
      if (intersection && intersection.object.el && intersection.object.el === this.el) {
        this.mouseDown = true;
        this.originalPos.copy(this.el.object3D.position);
      }
    },

    onMouseUp: function () {
      this.mouseDown = false;
    },

    onMouseMove: function (e) {
      if (!this.mouseDown) return;
      const intersection = this.getIntersection(e);
      if (intersection) {
        this.newPos.copy(intersection.point);
        
        // Projetar a posição atual do objeto na superfície do plano
        const planeNormal = new THREE.Vector3(0, 1, 0);
        const projectedPoint = this.newPos.projectOnPlane(planeNormal);
        
        this.directionVec.copy(projectedPoint).sub(this.originalPos);
        
        // Verificar se o objeto se move apenas ao longo do plano
        if (Math.abs(this.directionVec.y) < 0.001) {
          this.el.object3D.position.add(this.directionVec);
        }
      }
    },

    getIntersection: function (e) {
      const mouse = new THREE.Vector2((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, this.el.sceneEl.camera);
      const intersections = raycaster.intersectObjects(this.el.sceneEl.object3D.children, true);
      return intersections[0] ? intersections[0] : null;
    },
  });

  // Restante do código
});
