#!/usr/bin/Rscript
#    splitcsv.r is an algorythm created to split large documents in equal parts.
#    Copyright (C) 2015  Thibaut LOMBARD
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
library(data.table) #1.9.5+
coran <- read.csv(file="coranfr.csv",head=TRUE,sep="|")
print("Nom des entetes de colonnes")
names(coran)
n.coran <- nrow(coran[4])
n.coran
diviseur <- (n.coran / 4 )
deuxdiviseur <- (as.integer(diviseur) * 2)
troisdiviseur <- (as.integer(diviseur) * 3)
print("taille des segments avec entete (6236 / 4) + 1")
print(diviseur)
print(deuxdiviseur)
print(troisdiviseur)
#prépare le nom des fichier
coranpart1 <- "coranfrpart1.csv"
coranpart2 <- "coranfrpart2.csv"
coranpart3 <- "coranfrpart3.csv"
coranpart4 <- "coranfrpart4.csv"
#assigne le fichier à la méthode file
fichier1 <- file(coranpart1)
fichier2 <- file(coranpart2)
fichier3 <- file(coranpart3)
fichier4 <- file(coranpart4)
#prépares les tables de résultats
#écrit les résultats en fichier csv

data <- coran[1:diviseur, 1:4]
write.table(data, file=fichier1,quote=F,sep="|")
n1 <- diviseur + 1
data2 <- coran[n1:deuxdiviseur, 1:4]
write.table(data2, file=fichier2,quote=F,sep="|")
n2 <- deuxdiviseur + 1		
data3 <- coran[n2:troisdiviseur, 1:4]
write.table(data3, file=fichier3,quote=F,sep="|")
n3 <- troisdiviseur + 1
data4 <- coran[n3:n.coran, 1:4]
write.table(data4, file=fichier4,quote=F,sep="|")

#ferme toute les connections avec les bibliothèques
#puis nettoie les données de ligne de commandes
closeAllConnections()
rm(list=ls())
