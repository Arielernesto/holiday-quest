"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import type { SurveyQuestion } from "@/lib/survey-questions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PenLine } from "lucide-react"

interface SurveyQuestionCardProps {
  question: SurveyQuestion
  index: number
  value: string | string[]
  onChange: (value: string | string[]) => void
}

export function SurveyQuestionCard({ question, index, value, onChange }: SurveyQuestionCardProps) {
  const [customValue, setCustomValue] = useState("")
  const [showCustomInput, setShowCustomInput] = useState(false)

  const handleSingleChange = (val: string) => {
    if (val === "__custom__") {
      setShowCustomInput(true)
      onChange(customValue || "")
    } else {
      setShowCustomInput(false)
      onChange(val)
    }
  }

  const handleCustomChange = (val: string) => {
    setCustomValue(val)
    onChange(val)
  }

  const handleMultipleChange = (option: string, checked: boolean) => {
    const currentValues = Array.isArray(value) ? value : []
    if (checked) {
      onChange([...currentValues, option])
    } else {
      onChange(currentValues.filter((v) => v !== option))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Card className="bg-card/60 backdrop-blur-md border-border/40 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
        <CardHeader className="pb-2 sm:pb-3 px-4 sm:px-6">
          <CardTitle className="text-sm sm:text-base font-medium flex items-start gap-2 sm:gap-3">
            <motion.span
              className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/20 text-primary text-xs font-bold flex-shrink-0"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              {index + 1}
            </motion.span>
            <span className="text-balance leading-relaxed">{question.question}</span>
            {question.required && <span className="text-primary text-xs">*</span>}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
          {question.type === "single" && question.options && (
            <RadioGroup
              value={showCustomInput ? "__custom__" : (value as string)}
              onValueChange={handleSingleChange}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2"
            >
              {question.options.map((option, optIndex) => (
                <motion.div
                  key={option}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: optIndex * 0.03 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Label
                    htmlFor={`${question.id}-${option}`}
                    className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-secondary/40 hover:bg-secondary/70 cursor-pointer transition-all border border-transparent hover:border-primary/20"
                  >
                    <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                    <span className="text-xs sm:text-sm">{option}</span>
                  </Label>
                </motion.div>
              ))}
              {question.allowCustom && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Label
                    htmlFor={`${question.id}-custom`}
                    className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-secondary/40 hover:bg-secondary/70 cursor-pointer transition-all border border-dashed border-primary/30 hover:border-primary/50"
                  >
                    <RadioGroupItem value="__custom__" id={`${question.id}-custom`} />
                    <PenLine className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary/70" />
                    <span className="text-xs sm:text-sm text-muted-foreground">Otro...</span>
                  </Label>
                </motion.div>
              )}
            </RadioGroup>
          )}

          {question.type === "single" && showCustomInput && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3">
              <Input
                placeholder="Escribe tu respuesta..."
                value={customValue}
                onChange={(e) => handleCustomChange(e.target.value)}
                className="bg-secondary/40 border-primary/30 focus:border-primary text-sm"
                autoFocus
              />
            </motion.div>
          )}

          {question.type === "multiple" && question.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {question.options.map((option, optIndex) => (
                <motion.div
                  key={option}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: optIndex * 0.03 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Label
                    htmlFor={`${question.id}-${option}`}
                    className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg bg-secondary/40 hover:bg-secondary/70 cursor-pointer transition-all border border-transparent hover:border-primary/20"
                  >
                    <Checkbox
                      id={`${question.id}-${option}`}
                      checked={Array.isArray(value) && value.includes(option)}
                      onCheckedChange={(checked) => handleMultipleChange(option, checked as boolean)}
                    />
                    <span className="text-xs sm:text-sm">{option}</span>
                  </Label>
                </motion.div>
              ))}
            </div>
          )}

          {question.type === "text" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <Textarea
                placeholder="Escribe tu respuesta aqui..."
                value={value as string}
                onChange={(e) => onChange(e.target.value)}
                className="bg-secondary/40 border-border/50 focus:border-primary min-h-[80px] sm:min-h-[100px] resize-none text-sm"
              />
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
