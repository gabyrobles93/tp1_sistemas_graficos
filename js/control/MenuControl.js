class MenuControl {
    constructor() {
        var ControlText = function() {
            this.castle_floors = 3;
            this.castle_width = 12;
            this.castle_long = 6;
            this.wall_sides = 6;
            this.generate = function() {
                CASTLE_SIZE_1 = this.castle_width;
                CASTLE_SIZE_2 = this.castle_long;
                CASTLE_FLOORS = this.castle_floors;
                CASTLE_WALL_SIDES = this.wall_sides;

                console.log(this.castle_floors);
        
                initWorldObjects();
            };

            this.controls_info = function() {
                alert(`
                Press [C] to change the camera type
                Press [U, H, J, K] to move catapult
                Press [W, A, S, D] to move in first person camera
                Press [SPACEBAR] to shoot the catapult
                Press [O] to reload catapult projectile
              `);
            };
        };

        var control_text = new ControlText();

        this.gui = new dat.GUI();
        this.gui.add(control_text, 'castle_floors', 1, 10)
                .step(1);
        this.gui.add(control_text, 'castle_width', 4, 15);
        this.gui.add(control_text, 'castle_long', 4, 15)
        this.gui.add(control_text, 'wall_sides', 4, 8)
                .step(1);
        this.gui.add(control_text, 'generate');
        this.gui.add(control_text, 'controls_info');
    }
}