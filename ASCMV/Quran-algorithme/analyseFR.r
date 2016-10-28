#!/usr/bin/Rscript
#    analyse.r is a script to analyse the quran in french, and to create datavis on it.
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
library("tm")
library("SnowballC") 
library("ggplot2")    
library("wordcloud")   

#extrait de https://rstudio-pubs-static.s3.amazonaws.com/31867_8236987cf0a8444e962ccd2aec46d9c3.html
closeAllConnections()
rm(list=ls())
setwd(Sys.getenv("PWD"))
con <- file("resultats.log")
sink(con, append=TRUE)
sink(con, append=TRUE, type="message")
read1 <- read.csv(file="coranfrpart12.csv",head=FALSE,sep="|")
read2 <- read.csv(file="coranfrpart22.csv",head=FALSE,sep="|")
read3 <- read.csv(file="coranfrpart32.csv",head=FALSE,sep="|")
read4 <- read.csv(file="coranfrpart42.csv",head=FALSE,sep="|")

nread1 <- (as.integer(nrow(read1[2])) +1)

doc1 <- read1[1:1559, 5]
doc2 <- read2[1:1559, 5]
doc3 <- read3[1:1559, 5]
doc4 <- read4[1:1559, 5]
doc.list <- list(doc1, doc2, doc3, doc4)
#calcul la longueur des colonnes soit 4 + 1 correspondant à la query
N.docs <- length(doc.list)

#vectorcorpus <- VectorSource(c(doc.list, query))
vectorcorpus <- VectorSource(doc.list)
#fabrique le corpus à partir des documents sources
docs <- Corpus(vectorcorpus)
#résume les données et les classes   
summary(docs)
#enleve la ponctuation
docs <- tm_map(docs, removePunctuation)   

#effectue un parsing des caractères spéciaux
#remplacements de caractères
for(j in seq(docs))   
  {   
   docs[[j]] <- gsub("egrave", "è", docs[[j]])   
   docs[[j]] <- gsub("agrave", "à", docs[[j]])   
   docs[[j]] <- gsub("eacute", "é", docs[[j]])   
    docs[[j]] <- gsub("acirc", "â", docs[[j]])   
    docs[[j]] <- gsub("ecirc", "ê", docs[[j]])   
    docs[[j]] <- gsub("icirc", "î", docs[[j]])
    docs[[j]] <- gsub("apos", " ", docs[[j]]) 
    docs[[j]] <- gsub("ecirc", "ê", docs[[j]])      
    docs[[j]] <- gsub("acute", "à", docs[[j]])
    docs[[j]] <- gsub("ugrave", "ù", docs[[j]])   
    docs[[j]] <- gsub("ucirc", "û", docs[[j]])   
    docs[[j]] <- gsub("ocirc", "ô", docs[[j]])   
    docs[[j]] <- gsub("raquo", "", docs[[j]])     
    docs[[j]] <- gsub("laquo", "", docs[[j]])                                                     
}   

#ôte les nombres / chiffres du texte 
docs <- tm_map(docs, removeNumbers)   

#converti les chaînes de caractères en minuscules
docs <- tm_map(docs, tolower)   

#/!\ important : rajoute la liste des stopmotss
docs <- tm_map(docs, removeWords, stopwords("french"))   

#la commande suivante permet de supprimer les mots du texte
docs <- tm_map(docs, removeWords, c("ainsi", "allah", "alors", "car", "ceux", "dis", "dit", "donc", "mais", "parmi", "puis", "vers", "tout", "celui", "certes", "comme", "entre", "jours", "terre", "fait", "plus", "seigneur", "avant", "après", "auprès", "quiconque", "tous", "toutes", "autre", "autres"))   

#combine les mots qui sont fait pour rester ensemble 
#for (j in seq(docs))
#	{
#		docs[[j]] <- gsub("qualitative research", "QDA", docs[[j]])
#		docs[[j]] <- gsub("qualitative studies", "QDA", docs[[j]])
#		docs[[j]] <- gsub("qualitative analysis", "QDA", docs[[j]])
#		docs[[j]] <- gsub("research methods", "research_methods", docs[[j]])
#		}

#supprime les fin de mots à l'aide de la bibliothèque snowballC 
#par exemple : travailler devient travail
#  library(SnowballC)   
docs <- tm_map(docs, stemDocument)   

#ôte les espaces blancs dans les documents (   )
#si et seulement si , ceux-ci ne sont pas nécessaire
docs <- tm_map(docs, stripWhitespace)   

#Traite les documents lu par R comme des documents en 
#plaintext
docs <- tm_map(docs, PlainTextDocument)   

###############
#  Partie 2   #
###############

#traite les documents sous forme d'une matrice de termes
#termsdocumentmatrix
dtm <- DocumentTermMatrix(docs)   
dtm
#pour visualiser les 5 premiers documents et les 10 000 premiers termes on utilise 
#la commande inspect
inspect(dtm[1:4, 1:10000])
#la commande dim permet l'affichage du nombre de documents et ses termes (dans l'ordre)
dim(dtm) 

#on peut aussi tranposer la matrice
#matrix transpose
tdm <- TermDocumentMatrix(docs)
tdm

###############
#  Partie 3   #
###############

#exploration des données
#organiser les termes par fréquence d'apparition
frequence <- colSums(as.matrix(dtm))
length(frequence)

#trier les données
#exporte la matrice au format csv
ord <- order(frequence)
m <- as.matrix(dtm)
dim(m)
write.csv(m, file="text/data.csv")
#analyse la parsimonie des termes à 50%
print("parsimonie")
dtms <- removeSparseTerms(dtm, 0.5)
inspect(dtm)
#récupère la fréquence des termes
frequence[head(ord)]   
print("avec tail")
frequence[tail(ord)]

#la fréquence des fréquences
print('la fréquence des fréquences')
head(table(frequence), 20)   
#le résultat affichera deux lignes de nombres, la ligne supérieure est la fréquence à laquelle les termes apparaîssent et la ligne inférieure donne le 
#nombre de mots qui apparaîssent à cette fréquence, dans le cas ci-dessus on considère que les 20 fréquence d'apparition les plus basses 
# avec le nombre de termes qui apparaissent une seule fois
#la commande tail quant à elle permet de connaître les 20 fréquences les plus élevées
print('les 20 fréquences les plus élevées')
tail(table(frequence), 20)   


frequence2 <- colSums(as.matrix(dtms))   
frequence2
wf <- data.frame(mots=names(frequence), frequence=frequence)   
head(wf)  
#affiche le graphique
#library("ggplot2")
png("graphique.png", width=1024, height=768, units='px', res=150)    
p <- ggplot(subset(wf, frequence>200), aes(mots, frequence))  #affiche les mots d'une fréquence de 200  
p <- p + geom_bar(stat="identity")   
p <- p + theme(axis.text.x=element_text(angle=45, hjust=1))   
p   
dev.off()

###############
#  partie 4   #
###############
#la correlation des termes
#pour retrouver une correlation entre 2 termes 
#suivant un indice de correlation 
#print('correlation  messager et peuple')
#corr <- findAssocs(dtm, c("messager" , "peuple"), corlimit=0.98) # en mettant une limite à 0.98
#corr
print('correlation peuple')
unicorr <- findAssocs(dtms, "peuple", corlimit=0.95) # limite à 0.95   
unicorr
write.csv(unicorr, file="correlation.csv")

###############
#  partie 5   #
###############
#nuage de mots
#documentation
#http://www.r-bloggers.com/word-cloud-in-r/
#library("wordcloud") 

#cheatsheet palette de couleurs
#https://www.nceas.ucsb.edu/~frazier/RSpatialGuides/colorPaletteCheatsheet.pdf
pal <- brewer.pal(9, "YlGn")
pal <- pal[-(1:2)]
set.seed(142)   
png("wordcloudminfreq.png", width=1024, height=768, units='px', res=300) 
#affiche les mots apparaissant 250 fois au minimum   
w1 <- wordcloud(names(frequence), frequence, min.frequence=250, scale=c(8,.3), rot.per=.35, vfont=c("serif","plain"))   
w1
dev.off()

#affiche les 500 mots les plus utilisés
#set.seed(16)   

#charge le fichier png à écrire en configurant la résolution  
#png("wordcloudmaxword.png", width=1024, height=768, units='px', res=300)

#charge la palette de couleurs
#pal <- brewer.pal(6, "Dark2")
#pal <- pal[-(1:2)]

#premier test avec les 200 mots les plus utilisés (à commentez un des deux)
#w2 <- wordcloud(names(frequence), frequence, scale=c(8,.3), min.frequence=200, max.words=200, random.order=T, rot.per=.15, colors=pal, vfont=c("serif","plain"))  

#deuxieme test avec les 500 mots les plus utilisés
#w2 <- wordcloud(names(frequence), frequence, scale=c(8,.2), max.words=500, random.order=T, rot.per=.15, colors=pal, vfont=c("serif","plain")) 
#invisible(w2)
#dev.off() 

#affiche les message d'avertissement
warnings()
 


sink() 
sink(type="message")
