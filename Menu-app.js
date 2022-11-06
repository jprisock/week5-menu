class Game {
  constructor(game) {
    this.game = game;
  }
  decribe() {
    return `${this.game}`;
  }
}

class Platform {
  constructor(platform) {
    this.platform = platform;
    this.games = [];
  }

  addGame(game) {
    if (game instanceof Game) {
      this.games.push(game);
    } else {
      throw new Error(
        `You can only add an instance of a Game. Argument is not a game: ${game}`
      );
    }
  }

  describe() {
    return `${this.platform} has ${this.games.length} games.`;
  }
}

class Menu {
  constructor() {
    this.platforms = [];
    this.selectedPlatform = null;
  }

  start() {
    let selection = this.showMainMenuOptions();
    while (selection != 0) {
      switch (selection) {
        case "1":
          this.addPlatform();
          break;
        case "2":
          this.viewPlatform();
          break;
        case "3":
          this.deletePlatfrom();
          break;
        case "4":
          this.displayPlatform();
          break;
        default:
          selection = 0;
      }
      selection = this.showMainMenuOptions();
    }

    alert("Goodbye!");
  }

  showMainMenuOptions() {
    return prompt(`
    0) Exit
    1) Add a platform
    2) View a platform
    3) Delete a platform
    4) Display all platforms
    `);
  }

  showPlatformMenuOptions(platformInfo) {
    return prompt(`
    0) back
    1) Add a game
    2) Delete a game
    ------------------
    ${platformInfo}
    `);
  }

  displayPlatform() {
    let platformString = "";
    for (let i = 0; i < this.platforms.length; i++) {
      platformString += i + ") " + this.platforms[i].platform + "\n";
    }
    alert(platformString);
  }

  addPlatform() {
    let name = prompt("Enter a new platform:");
    this.platforms.push(new Platform(name));
  }

  viewPlatform() {
    let index = prompt("Enter the index of the platform you wish to view");
    if (index > -1 && index < this.platforms.length) {
      this.selectedPlatform = this.platforms[index];
      let description = "Platform: " + this.selectedPlatform.platform + "\n";
      for (let i = 0; i < this.selectedPlatform.games.length; i++) {
        description += i + ") " + this.selectedPlatform.games[i].game + "\n";
      }

      let selection = this.showPlatformMenuOptions(description);
      switch (selection) {
        case "1":
          this.createGame();
          break;
        case "2":
          this.deleteGame();
      }
    }
  }

  deletePlatfrom() {
    let index = prompt("Enter the index of the platform you wish to delete:");
    if (index > -1 && index < this.platforms.length) {
      this.platforms.splice(index, 1);
    }
  }

  createGame() {
    let name = prompt("Enter the name of the new game:");
    this.selectedPlatform.games.push(new Game(name));
  }

  deleteGame() {
    let index = prompt("Enter the index of the game you wish to delete:");
    if (index > -1 && index < this.selectedPlatform.games.length) {
      this.selectedPlatform.games.splice(index, 1);
    }
  }
}

let menu = new Menu();
menu.start();
