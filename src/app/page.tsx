"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { AlertTriangle, Calculator, ClipboardList, FileText } from 'lucide-react';

const LossCalculator = () => {
  const [activeIncident, setActiveIncident] = useState(null);
  const [formData, setFormData] = useState({
    incidentType: 'leak',
    site: 'site-a',
    volume: '',
    surfaceArea: '',
    productionRate: '',
    downtime: '',
    contractValue: '',
    laborCost: '',
    equipmentCost: '',
    cleanupCost: '',
  });

  // Prix du baril de pétrole (exemple)
  const calculateLosses = () => {
    // Prix du baril en DZD
    const OIL_PRICE_DZD = 11600; // 80 USD ≈ 11600 DZD

    const productLoss = parseFloat(formData.volume) * OIL_PRICE_DZD;
    const repairCost = (parseFloat(formData.laborCost) + parseFloat(formData.equipmentCost)) * 145;
    const environmentalImpact = parseFloat(formData.surfaceArea) * parseFloat(formData.cleanupCost) * 145;
    const productionLoss = parseFloat(formData.productionRate) * parseFloat(formData.downtime) * 24 * 145;
    const contractPenalties = (parseFloat(formData.contractValue) * 0.001) * parseFloat(formData.downtime) * 145;
    const interruptionCost = parseFloat(formData.productionRate) * parseFloat(formData.downtime) * OIL_PRICE_DZD;

    return [
      { category: 'Perte produit', montant: productLoss || 36250000 }, // 250000€ * 145
      { category: 'Réparations', montant: repairCost || 26100000 }, // 180000€ * 145
      { category: 'Impact env.', montant: environmentalImpact || 13050000 }, // 90000€ * 145
      { category: 'Perte production', montant: productionLoss || 21750000 }, // 150000€ * 145
      { category: 'Pénalités', montant: contractPenalties || 17400000 }, // 120000€ * 145
      { category: 'Coût interruption', montant: interruptionCost || 14500000 }, // 100000€ * 145
    ];
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const lossData = calculateLosses();
  const totalLoss = lossData.reduce((acc, curr) => acc + curr.montant, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Calculateur de Pertes Financières</h1>
          <div className="flex space-x-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => setFormData({
                incidentType: 'leak',
                site: 'site-a',
                volume: '',
                surfaceArea: '',
                productionRate: '',
                downtime: '',
                contractValue: '',
                laborCost: '',
                equipmentCost: '',
                cleanupCost: '',
              })}
            >
              Nouveau Calcul
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Exporter PDF
            </button>
          </div>
        </div>

        {activeIncident && (
          <Alert className="bg-red-50 border-red-200">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-600">
              Incident en cours - Site de stockage A3 - Fuite détectée
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="saisie" className="space-y-4">
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
                <CardTitle>Informations de l&apos;incident</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Type d&apos;incident
                  </label>
                  <select
                    name="incidentType"
                    value={formData.incidentType}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2"
                  >
                    <option value="leak">Fuite</option>
                    <option value="explosion">Explosion</option>
                    <option value="fire">Incendie</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Site concerné
                  </label>
                  <select
                    name="site"
                    value={formData.site}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2"
                  >
                    <option value="site-a">Site A - Terminal 1</option>
                    <option value="site-b">Site B - Terminal 2</option>
                    <option value="site-c">Site C - Terminal 3</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Données de l&apos;incident</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Volume perdu (barils)
                  </label>
                  <input
                    type="number"
                    name="volume"
                    value={formData.volume}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Surface impactée (m²)
                  </label>
                  <input
                    type="number"
                    name="surfaceArea"
                    value={formData.surfaceArea}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Production journalière (barils/jour)
                  </label>
                  <input
                    type="number"
                    name="productionRate"
                    value={formData.productionRate}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Durée d&apos;interruption estimée (jours)
                  </label>
                  <input
                    type="number"
                    name="downtime"
                    value={formData.downtime}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Données financières</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Valeur du contrat (€)
                  </label>
                  <input
                    type="number"
                    name="contractValue"
                    value={formData.contractValue}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Coût de la main d&apos;œuvre (€)
                  </label>
                  <input
                    type="number"
                    name="laborCost"
                    value={formData.laborCost}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Coût des équipements (€)
                  </label>
                  <input
                    type="number"
                    name="equipmentCost"
                    value={formData.equipmentCost}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Coût de nettoyage par m² (€)
                  </label>
                  <input
                    type="number"
                    name="cleanupCost"
                    value={formData.cleanupCost}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg p-2"
                  />
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
                    <p className="text-2xl font-bold text-blue-600">
                      {totalLoss.toLocaleString('fr-FR')} DZD
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold">Durée d&apos;interruption estimée</h3>
                    <p className="text-2xl font-bold text-blue-600">
                      {formData.downtime || 72} heures
                    </p>
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
                    <h3 className="font-semibold mb-2">Synthèse de l&apos;incident</h3>
                    <p className="text-gray-600">
                      {formData.incidentType === 'leak' ? 'Fuite' : formData.incidentType === 'explosion' ? 'Explosion' : 'Incendie'}
                      détecté(e) sur le {formData.site === 'site-a' ? 'Site A - Terminal 1' : formData.site === 'site-b' ? 'Site B - Terminal 2' : 'Site C - Terminal 3'}.
                      Impact estimé : {formData.volume || 'N/A'} barils de pétrole brut, surface contaminée de {formData.surfaceArea || 'N/A'}m².
                    </p>
                  </div>
                  <div className="border-b pb-4">
                    <h3 className="font-semibold mb-2">Détail des pertes</h3>
                    <ul className="space-y-2 text-gray-600">
                      {lossData.map((loss, index) => (
                        <li key={index}>
                          {loss.category} : {loss.montant.toLocaleString('fr-FR')} DZD
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-b pb-4">
                    <h3 className="font-semibold mb-2">Impact sur la production</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>Production journalière : {formData.productionRate || 'N/A'} barils/jour</li>
                      <li>Durée d&apos;interruption : {formData.downtime || 'N/A'} jours</li>
                      <li>Perte de production totale : {(parseFloat(formData.productionRate || '0') * parseFloat(formData.downtime || '0')).toLocaleString('fr-FR')} barils</li>
                    </ul>
                  </div>

                  <div className="border-b pb-4">
                    <h3 className="font-semibold mb-2">Coûts de réparation et nettoyage</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>Main d&apos;œuvre : {parseFloat(formData.laborCost || '0').toLocaleString('fr-FR')} €</li>
                      <li>Équipements : {parseFloat(formData.equipmentCost || '0').toLocaleString('fr-FR')} €</li>
                      <li>Coût de nettoyage : {(parseFloat(formData.surfaceArea || '0') * parseFloat(formData.cleanupCost || '0')).toLocaleString('fr-FR')} €</li>
                    </ul>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Conclusion</h3>
                    <p className="text-gray-600">
                      L&apos;incident a généré une perte financière totale estimée à {totalLoss.toLocaleString('fr-FR')} €.
                      Les mesures de réparation et de nettoyage sont en cours, avec un impact significatif
                      sur la production et les engagements contractuels. Une révision des procédures de
                      sécurité et de maintenance préventive est recommandée pour éviter de futurs incidents similaires.
                    </p>
                  </div>

                  <div className="mt-6 flex justify-end space-x-4">
                    <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
                      Télécharger PDF
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Envoyer le rapport
                    </button>
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
