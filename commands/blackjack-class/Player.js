/**
 *
 * @property {array} hand
 * @property {number} aceCount
 * @property {number} points
 * @property {boolean} isBusted
 */
class Player {
    constructor() {
        this.hand = [];
        this.aceCount = 0;
        this.points = 0;
        this.isBusted = false;
    }

    addCard(card) {
        this.hand.push(card);
        if (card.value === 0) {
            if (this.points + 11 > 21) {
                this.points += 1;
            } else {
                this.aceCount += 1;
                this.points += 11;
            }
        } else if (card.value >= 9) {
            this.points += 10;
        } else {
            this.points += card.value + 1;
        }

        while (this.aceCount > 0 && this.points > 21) {
            this.points -= 10;
            this.aceCount--;
        }

        if (this.points > 21) {
            this.isBusted = true;
        }
    }

    showCards() {
        let cards = '';
        for (let i = 0; i < this.hand.length; i++) {
            if (this.hand[i].visible) {
                cards += this.hand[i].suit + this.hand[i].rank + ' ';
            }
        }
        return cards;
    }

    getPoints() {
        if (!this.hand[1].visible) {
            let point = 0;
            if (this.hand[0].value === 0) {
                point = 11;
            } else if (this.hand[0].value >= 9) {
                point = 10;
            } else {
                point = this.hand[0].value + 1;
            }
            return point;
        }

        return this.points;

    }

}
exports.Player = Player;
