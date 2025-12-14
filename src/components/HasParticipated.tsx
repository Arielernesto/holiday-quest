"use client"
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Check, CheckCircle2, Copy, Gift, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface ParticipantInterface {
    userToken: string
    
}


export function HasParticipated({ userToken }: ParticipantInterface){
    const [copied, setCopied] = useState(false)
    
    const copyToken = async () => {
        if (userToken) {
        await navigator.clipboard.writeText(userToken)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
     <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md sm:max-w-lg md:max-w-2xl mx-auto px-2 space-y-4"
      >
        <Card className="bg-card/80 backdrop-blur-sm border-primary/30">
          <CardContent className="p-6 sm:p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
            >
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-green-400" />
            </motion.div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Ya participaste</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
              Gracias por completar nuestra encuesta navidena para desarrolladores. Te deseamos una feliz Navidad y un
              prospero codigo nuevo
            </p>

            {userToken && (
              <div className="mb-4 sm:mb-6 p-3 bg-primary/10 border border-primary/30 rounded-lg">
                <p className="text-xs text-muted-foreground mb-2">Tu token personal:</p>
                <div className="flex items-center gap-2 justify-center">
                  <code className="text-xs sm:text-sm font-mono text-primary">{userToken}</code>
                  <Button size="sm" variant="ghost" onClick={copyToken} className="h-6 w-6 p-0">
                    {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                  </Button>
                </div>
              </div>
            )}

            <motion.div
              className="flex justify-center gap-2 sm:gap-3 mb-4 sm:mb-6"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            >
              <Gift className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
              <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
            </motion.div>
            <Button asChild variant="outline" size="sm" className="sm:h-10 bg-transparent">
              <a href="/analytics">
                <Sparkles className="w-4 h-4 mr-2" />
                Ver Resultados
              </a>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )
}