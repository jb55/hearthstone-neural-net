#!/usr/bin/env Rscript

library(nnet)

cards <- read.csv('./prepared.csv', sep=',')
cards$cost <- factor(cards$cost)

nntest <- nnet(cost ~ . - name - faction, data=cards, size=16, maxit=1000, subset=1:200, decay=0.2)

cards$costP <- predict(nntest, newdata = cards, type = "class")
accurate <- cards[cards$cost == cards$costP,][c("name","cost","costP")]
nrow(accurate) / nrow(cards)

cards[cards$cost != cards$costP,][c("name","cost","costP")]
