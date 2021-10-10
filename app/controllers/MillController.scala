package controllers

import com.google.inject.{Guice, Injector}
import de.htwg.se.mill.MillModule
import de.htwg.se.mill.controller.controllerComponent.{ControllerInterface, GameState}
import play.api.mvc._

import javax.inject._

@Singleton
class MillController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {
  val injector: Injector = Guice.createInjector(new MillModule)
  val controller: ControllerInterface = injector.getInstance(classOf[ControllerInterface])

  val gameSize = 7

  def index(): Action[AnyContent] = Action {
    Ok(print())
  }

  def newGame(): Action[AnyContent] = Action {
    controller.createEmptyField(gameSize)
    Ok(print())
  }

  def randomGame(): Action[AnyContent] = Action {
    controller.createRandomField(gameSize)
    Ok(print())
  }

  def playGame(coords: String): Action[AnyContent] = Action {
    coords match {
      case _ => coords.toList.filter(p => p != ' ').filter(_.isDigit).map(p => p.toString.toInt) match {
        case row :: column :: Nil => controller.handleClick(row, column)
          Ok(print())
        case _ => BadRequest(print())
      }
    }
  }

  def undo(): Action[AnyContent] = Action {
    controller.undo()
    Ok(print())
  }

  def redo(): Action[AnyContent] = Action {
    controller.redo()
    Ok(print())
  }

  def print(): String = {
    s"${controller.fieldToString}\n${GameState.state}"
  }
}
