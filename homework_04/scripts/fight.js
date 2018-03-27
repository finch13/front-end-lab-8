function showFight(champion, monster) {
    champion.setSwitchMove(true);
    console.log(champion.getSwitchMove());
    let minNumber = 0;
    let maxNumber = 11;
    while (champion.isAlive() && monster.isAlive()) {
        if (champion.getSwitchMove()) {
            champion.setSwitchMove(false);
            monster.setSwitchMove(true);
            let randomNumber = minNumber - 0.5 + Math.random() * (maxNumber - minNumber + 1);
            randomNumber = Math.round(randomNumber);
            if (randomNumber < 3) {
                champion.defence();
                console.log(`The ${champion.getName()} active shield!`);
            } else if (randomNumber < 6) {
                champion.heal();
                console.log(`The ${champion.getName()} healed! Current HP: ${champion.getHitpoints()}`);
            } else {
                champion.fight(monster);
                console.log(`The ${champion.getName()} strikes the ${monster.getName()}. HP ${monster.getName()}: ${monster.getHitpoints()}`);
            }
        }
        if (monster.getSwitchMove()) {
            monster.setSwitchMove(false);
            champion.setSwitchMove(true);
            let randomNumber = minNumber - 0.5 + Math.random() * (maxNumber - minNumber + 1);
            randomNumber = Math.round(randomNumber);
            if (randomNumber < 3) {
                monster.enrage();
                console.log(`The ${monster.getName()} active state ENRAGE. Double damage on two next move.`)
            } else if (randomNumber < 6) {
                monster.fury();
                console.log(`The ${monster.getName()} active state FURY. Attack increase. Current damage: ${monster.getAttack()}.`)
            } else {
                monster.fight(champion);
                console.log(`The ${monster.getName()} strikes the ${champion.getName()}. HP ${champion.getName()}: ${champion.getHitpoints()}`);
            }
        }
    }
}
showFight(hunter, beast);