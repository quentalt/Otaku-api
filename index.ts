import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import * as bodyParser from "body-parser";

const app: Express = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());

// Créer un média
app.post("/media", async (req: Request, res: Response) => {
  try {
    const media = await prisma.media.create({
      data: req.body,
    });
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: "Failed to create media" });
  }
});

// Lire tous les médias
app.get("/media", async (req: Request, res: Response) => {
  try {
    const media = await prisma.media.findMany();
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch media" });
  }
});

// Lire un média par ID
app.get("/media/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const media = await prisma.media.findUnique({
      where: { id: parseInt(id) },
    });
    if (media) {
      res.json(media);
    } else {
      res.status(404).json({ error: "Media not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch media by ID" });
  }
});

// Mettre à jour un média
app.put("/media/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedMedia = await prisma.media.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.json(updatedMedia);
  } catch (error) {
    res.status(500).json({ error: "Failed to update media" });
  }
});

// Supprimer un média
app.delete("/media/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.media.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Media deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete media" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
