import dotenv from 'dotenv'
import path from 'path'
import Database from './Database'
import Express from './Express'

class App {
  public loadConfiguration() {
    dotenv.config({ path: path.join(__dirname, '../../.env') })
  }

  public loadDatabase() {
    Database.init()
  }

  public loadServer() {
    Express.init()
  }
}

export default new App()
