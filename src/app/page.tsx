"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { AlertTriangle, Calculator, ClipboardList, FileText } from 'lucide-react';

const LossCalculator = () => {
  const [activeIncident, setActiveIncident] = useState(null);

  // Données exemple pour le graphique
  const lossData = [
    { category: 'Perte produit', montant: 250000 },
    { category: 'Réparations', montant: 180000 },
    { category: 'Pénalités', montant: 120000 },
    { category: 'Impact env.', montant: 90000 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* En-tête */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Calculateur de Pertes Financières</h1>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Nouveau Calcul
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Exporter PDF
            </button>
          </div>
        </div>

        {/* Alerte d'incident actif */}
        {activeIncident && (
          <Alert className="bg-red-50 border-red-200">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-600">
              Incident en cours - Site de stockage A3 - Fuite détectée
            </AlertDescription>
          </Alert>
        )}

        {/* Interface principale */}
        <Tabs defaultValue="saisie" className="space-y-4">
          {/* <TabsList className="w-full bg-white p-1 space-x-2"> */}
          {/*   <TabsTrigger value="saisie">Saisie des données</TabsTrigger> */}
          {/*   <TabsTrigger value="calcul">Calcul des pertes</TabsTrigger> */}
          {/*   <TabsTrigger value="rapport">Rapport</TabsTrigger> */}
          {/* </TabsList> */}
          <TabsList className="w-full bg-gray-100/80 p-2 flex justify-center gap-1 rounded-xl">
            <TabsTrigger
              value="saisie"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200"
            >
              <FileText className="w-4 h-4" />
              <span>Saisie des données</span>
            </TabsTrigger>
            <TabsTrigger
              value="calcul"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200"
            >
              <Calculator className="w-4 h-4" />
              <span>Calcul des pertes</span>
            </TabsTrigger>
            <TabsTrigger
              value="rapport"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200"
            >
              <ClipboardList className="w-4 h-4" />
              <span>Rapport</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="saisie" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informations de l'incident</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Type d'incident
                  </label>
                  <select className="w-full border rounded-lg p-2">
                    <option>Fuite</option>
                    <option>Explosion</option>
                    <option>Incendie</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Site concerné
                  </label>
                  <select className="w-full border rounded-lg p-2">
                    <option>Site A - Terminal 1</option>
                    <option>Site B - Terminal 2</option>
                    <option>Site C - Terminal 3</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Données de l'incident</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Volume estimé (barils)
                  </label>
                  <input type="number" className="w-full border rounded-lg p-2" />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Surface impactée (m²)
                  </label>
                  <input type="number" className="w-full border rounded-lg p-2" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calcul">
            <Card>
              <CardHeader>
                <CardTitle>Répartition des pertes estimées</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <BarChart width={800} height={300} data={lossData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="montant" fill="#3b82f6" />
                  </BarChart>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold">Pertes totales estimées</h3>
                    <p className="text-2xl font-bold text-blue-600">640 000 €</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold">Durée d'interruption estimée</h3>
                    <p className="text-2xl font-bold text-blue-600">72 heures</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rapport">
            <Card>
              <CardHeader>
                <CardTitle>Rapport détaillé des pertes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h3 className="font-semibold mb-2">Synthèse de l'incident</h3>
                    <p className="text-gray-600">
                      Fuite détectée sur le site A - Terminal 1 le 03/01/2025 à 08:30.
                      Impact estimé : 1000 barils de pétrole brut, surface contaminée de 500m².
                    </p>
                  </div>
                  <div className="border-b pb-4">
                    <h3 className="font-semibold mb-2">Détail des pertes</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>Perte de produit : 250 000 €</li>
                      <li>Coûts de réparation : 180 000 €</li>
                      <li>Pénalités contractuelles : 120 000 €</li>
                      <li>Impact environnemental : 90 000 €</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Recommandations</h3>
                    <p className="text-gray-600">
                      1. Renforcement immédiat des procédures de maintenance préventive
                      2. Mise à jour du plan d'intervention d'urgence
                      3. Formation supplémentaire du personnel de surveillance
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LossCalculator;
