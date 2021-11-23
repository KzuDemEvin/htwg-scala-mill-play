package controllers

import play.api.libs.streams.ActorFlow
import akka.actor.ActorSystem
import akka.stream.Materializer
import akka.actor._
import com.google.inject.{Guice, Injector}
import de.htwg.se.mill.MillModule
import de.htwg.se.mill.controller.controllerComponent.{CellChanged, ControllerInterface, GameState}
import play.api.libs.json.Json
import de.htwg.se.mill.controller.controllerComponent.{ControllerInterface, GameState}
import play.api.libs.json.{JsNumber, Json}
import play.api.mvc._
import play.api.routing.{JavaScriptReverseRoute, JavaScriptReverseRouter}

import javax.inject._
import play.twirl.api.{Html, MimeTypes}

import scala.swing.Reactor

@Singleton
class MillController @Inject()(val controllerComponents: ControllerComponents)(implicit system: ActorSystem, mat: Materializer) extends BaseController {
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
          Ok(cellToJson(row, column))
        case _ => BadRequest(print())
      }
    }
  }

  def getGame(): Action[AnyContent] = Action {
    controller.fieldToString
    Ok(print())
  }

  def getCellColor(row: String, col: String): Action[AnyContent] = Action {

    Ok(controller.cell(row.toInt, col.toInt).getContent.whichColor.toString)
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

  def info(path: String): Action[AnyContent] = Action {
    if (path.equals("about")) {
    } else if (path.equals("history")) {
    } else if (path.equals("objective")) {
    } else if (path.equals("guide")) {
    } else if (path.equals("rules")) {
    }
    Ok(fieldToJson())
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

  def fieldToJsonAction(): Action[AnyContent] = Action {
    Ok(fieldToJson())
  }

  def fieldToJson(): String = {
    Json.prettyPrint(
      Json.obj(
        "game" -> Json.obj(
          "roundCounter" -> JsNumber(controller.getRoundCounter),
          "winner" -> JsNumber(controller.getRoundManager.winner),
          "field" -> Json.toJson(
            for {
              row <- 0 until gameSize
              col <- 0 until gameSize
            } yield {
              if (controller.possiblePosition(row, col)) {
                Json.obj(
                  "row" -> row,
                  "col" -> col,
                  "color" -> Json.toJson(controller.cell(row, col).getContent.whichColor)
                )
              } else {
                Json.obj(
                  "row" -> row,
                  "col" -> col,
                  "color" -> "empty"
                )
              }
            }
          )
        )
      )
    )
  }

  def cellToJson(row: Int, col: Int): String = {
    val cell = controller.cell(row, col)
    Json.prettyPrint(
      Json.obj(
        "cell" -> Json.obj(
          "row" -> row,
          "col" -> col,
          "color" -> cell.getContent.whichColor
        )
      )
    )
  }

  def socket = WebSocket.accept[String, String] { request =>
    ActorFlow.actorRef { out =>
      println("Connect received")
      MillWebSocketActorFactory.create(out)
    }
  }

  object MillWebSocketActorFactory {
    def create(out: ActorRef): Props = {
      Props(new MillWebSocketActor(out))
    }
  }

  class MillWebSocketActor(out: ActorRef) extends Actor with Reactor {
    listenTo(controller)

    def receive = {
      case msg: String =>
        out ! (fieldToJson())
        println("Sent Json to Client"+ msg)
    }

    reactions += {
      case event: CellChanged => sendJsonToClient
    }

    def sendJsonToClient = {
      println("Received event from Controller")
      out ! fieldToJson()
    }
  }
}
