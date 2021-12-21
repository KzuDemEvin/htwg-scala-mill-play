name := "htwg-scala-mill-play"
organization := "de.htwg.wa"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.13.6"

libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "5.0.0" % Test

libraryDependencies += "net.codingwell" %% "scala-guice" % "4.2.10"
libraryDependencies += "org.scala-lang.modules" %% "scala-swing" % "2.1.1"

// Adds additional packages into Twirl
//TwirlKeys.templateImports += "de.htwg.wa.controllers._"
git add .
// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "de.htwg.wa.binders._"
