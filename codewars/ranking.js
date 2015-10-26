// TODO: create the User class/object
// it must support rank, progress and the incProgress(rank) method

// The rank and progress numbers we're looking for don't make any
// sense, so I'm doing the math with "level" and "xp", and converting.

class User {

  constructor(name, level=0, xp=0) {
    this.name = name;
    this.level = level;
    this.xp = xp;
    this.progress = xp % 100;
  }

  findXPGain(katarank) {
    let katalevel = this.rankToLevel(katarank);
    if (this.level-katalevel >= 2){
      return 0;
    } else if (this.level-katalevel === 1) {
        return 1;
    } else if (this.level === katalevel) {
        return 3;
    } else {
        let diff = katalevel - this.level;
        return diff*diff*10;
    }
  }

  levelUp() {
    this.level = Math.min(Math.floor(this.xp/100), 15);
    if (this.level===15) {
       this.xp = 1500;
     }
    this.progress = this.xp % 100;
  }

  rankToLevel(katarank) {
    if (katarank < 0) {
      return katarank + 8;
    } else if (katarank > 0) {
      return katarank + 7;
    } else {
      throw "Bad katarank!"
    }
  }

  incProgress (katarank) {
    if ((katarank >= -8 && katarank < 0) || (katarank >0 && katarank <9)){
      this.xp += this.findXPGain(katarank);
      this.levelUp();
    } else {
        throw "Bad kata rank!";
    }
  }
  get rank() {
    if (this.level < 8) {
      return this.level-8;
    } else {
        return this.level-7;
    }
  }
}