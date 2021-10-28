package controllers

import com.google.inject.{Guice, Injector}
import de.htwg.se.mill.MillModule
import de.htwg.se.mill.controller.controllerComponent.{ControllerInterface, GameState}
import play.api.mvc._
import play.api.routing.{JavaScriptReverseRoute, JavaScriptReverseRouter}

import javax.inject._
import play.twirl.api.{Html, MimeTypes}

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

  def getGame(): Action[AnyContent] = Action {
    controller.fieldToString
    Ok(print())
  }

  def undo(): Action[AnyContent] = Action {
    controller.undo()
    Ok(print())
  }

  def redo(): Action[AnyContent] = Action {
    controller.redo()
    Ok(print())
  }

  def about(): Action[AnyContent] = Action {
    Ok(views.html.index())
  }

  def print(): Html = {
    views.html.mill(controller)
  }

  def javascriptRoutes: Action[AnyContent] = Action { implicit request =>
    Ok(
      JavaScriptReverseRouter("jsRoutes")(
        routes.javascript.MillController.playGame,
        routes.javascript.MillController.randomGame,
        routes.javascript.MillController.newGame,
        routes.javascript.Assets.versioned
      )
    ).as(MimeTypes.JAVASCRIPT)
  }
}
