// Task 1
function assign(someObject, ...initialObjects) {
    if (someObject instanceof Object) {
        initialObjects.forEach(object => {
            Object.defineProperties(someObject, Object.keys(object).reduce((descriptors, key) => {
                descriptors[key] = Object.getOwnPropertyDescriptor(object, key);
                return descriptors;
            }, {}));
        });
        return someObject;
    } else {
        console.log('Incorrect data!');
    }
}
var defaults = { width: 100, height: 100 };
var options = { width: 150 };
var configs = assign({}, defaults, options);

// Task 2
function FighterConstructor({ name, attack, hitpoints }) {
    this._totalHitpoints = hitpoints;
    this._currentHitpoints = this._totalHitpoints;
    this._attack = attack;
    this._blockAttack = false;
}

FighterConstructor.prototype.getHitpoints = function () {
    return this._currentHitpoints;
}
FighterConstructor.prototype.setHitpoints = function (setHP) {
    if (this.isAlive()) {
        return this._currentHitpoints += setHP;
    } else {
        console.log('The game is over. You died');
    }
}
FighterConstructor.prototype.getTotalHitpoints = function () {
    return this._totalHitpoints;
}
FighterConstructor.prototype.setTotalHitpoints = function (setTotalHP) {
    if (this.isAlive()) {
        return this._totalHitpoints += setTotalHP;
    } else {
        console.log('The game is over. You died');
    }
}
FighterConstructor.prototype.getAttack = function () {
    return this._attack;
}
FighterConstructor.prototype.setAttack = function (damage) {
    return this._attack += damage;
}
FighterConstructor.prototype.fight = function (opponent) {
    if (opponent.isAlive()) {
        if (!opponent._blockAttack && opponent._currentHitpoints - this._attack > 0) {
            opponent._currentHitpoints -= this._attack;
        } else if (!opponent._blockAttack && opponent._currentHitpoints - this._attack <= 0) {
            opponent._currentHitpoints = 0;
            console.log('Opponent died');
            return opponent._currentHitpoints;
        } else {
            console.log('Block damage');
            return opponent._blockAttack = false;
        }
    } else {
        console.log('Opponent died');
        return opponent._currentHitpoints;
    }
}
FighterConstructor.prototype.isAlive = function () {
    if (this.getHitpoints()) {
        return true;
    } else {
        return false;
    }
}

function Champion({ name, attack, hitpoints }) {
    FighterConstructor.apply(this, arguments);
}
Champion.prototype = Object.create(FighterConstructor.prototype);
Champion.prototype.constructor = Champion;

Champion.prototype.fight = function (opponent) {
    let increaseAttack = 1;
    if (opponent.getHitpoints() - this.getAttack() <= 0) {
        this.setAttack(increaseAttack);
    }
    FighterConstructor.prototype.fight.apply(this, arguments);
}
Champion.prototype.heal = function () {
    let hpHeal = 5;
    if (this.getHitpoints() + hpHeal <= this.getTotalHitpoints()) {
        this.setHitpoints(hpHeal);
    } else if (this.getHitpoints() < this.getTotalHitpoints() && this.getHitpoints() + hpHeal > this.getTotalHitpoints()) {
        this.setHitpoints(this.getTotalHitpoints() - this.getHitpoints());
    } else {
        console.log(`You cann't heal. You have maximun HP`);
    }
}
Champion.prototype.defence = function () {
    let increaseTotalHP = 1;
    this._blockAttack = true;
    console.log('Damage block is active');
    this.setTotalHitpoints(increaseTotalHP);
}

function Monster({ name, attack, hitpoints }) {
    FighterConstructor.apply(this, arguments);

    this._countSteps = 0;
    this._doubleDamage = false;
}
Monster.prototype = Object.create(FighterConstructor.prototype);
Monster.prototype.constructor = Monster;

Monster.prototype.fight = function (opponent) {
    let restoreHP = 0.25;
    let restoreTotalHP = 0.1;
    if (opponent._currentHitpoints - this._attack <= 0) {
        this.setHitpoints(Math.floor(opponent.getTotalHitpoints() * restoreHP));
        this.setTotalHitpoints(Math.floor(opponent.getTotalHitpoints() * restoreTotalHP));
    }

    if (!opponent.isAlive()) {
        console.log('Opponent died');
    } else if (opponent.isAlive() && this._doubleDamage && this._countSteps < 2) {
        if (!opponent._blockAttack && opponent.getHitpoints() - this.getAttack() > 0) {
            this._countSteps++;
            opponent.setHitpoints(-this.getAttack() * 2);
            return opponent.getHitpoints();
        } else if (!opponent._blockAttack && opponent.getHitpoints() - this.getAttack() <= 0) {
            this._countSteps++;
            opponent._currentHitpoints = 0;
            console.log('Opponent died');
            return opponent.getHitpoints();
        } else {
            this._countSteps++;
            return opponent._blockAttack = false;
        }
    } else {
        this._doubleDamage = false;
        this._countSteps = 0;
        FighterConstructor.prototype.fight.apply(this, arguments);
        return opponent.getHitpoints();
    }
}
Monster.prototype.enrage = function () {
    this._doubleDamage = true;
}
Monster.prototype.fury = function () {
    let reduceHP = 5;
    let increaseAttack = 2;
    if (this.getHitpoints() - reduceHP > 0) {
        this.setHitpoints(-reduceHP);
        this.setTotalHitpoints(-reduceHP);
        this.setAttack(increaseAttack);
    } else {
        console.log('Сan not apply this ability. Low level of health')
    }
}