const ProgramsService = require("../../services/contentEdit/programsService");
const programsService = new ProgramsService();

class ProgramsController {
  // Get all Programs entries
  async getAllPrograms(req, res) {
    try {
      const programsEntries = await programsService.getAllPrograms();
      res.status(200).json(programsEntries);
    } catch (error) {
      res.status(500).json({
        error: "Failed to fetch Programs entries",
        details: error.message,
      });
    }
  }

  // Get Program entry by ID
  async getProgramById(req, res) {
    try {
      const { id } = req.params;
      const program = await programsService.getProgramById(Number(id));

      if (!program) {
        return res.status(404).json({ error: "Program not found" });
      }

      res.status(200).json(program);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to fetch Program", details: error.message });
    }
  }

  // Create new Program entry
  async createProgram(req, res) {
    try {
      const { contentType, content } = req.body;

      if (!contentType || !content) {
        return res
          .status(400)
          .json({ error: "Content type and content are required" });
      }

      const newProgram = await programsService.createProgram(
        contentType,
        content
      );
      res.status(201).json(newProgram);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to create Program", details: error.message });
    }
  }

  // Update Program entry
  async updateProgram(req, res) {
    try {
      const { id } = req.params;
      const { contentType, content } = req.body;

      const existingProgram = await programsService.getProgramById(Number(id));

      if (!existingProgram) {
        return res.status(404).json({ error: "Program not found" });
      }

      const updatedProgram = await programsService.updateProgram(
        Number(id),
        contentType || existingProgram.contentType,
        content || existingProgram.content
      );

      res.status(200).json(updatedProgram);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to update Program", details: error.message });
    }
  }

  // Delete Program entry
  async deleteProgram(req, res) {
    try {
      const { id } = req.params;

      const existingProgram = await programsService.getProgramById(Number(id));

      if (!existingProgram) {
        return res.status(404).json({ error: "Program not found" });
      }

      await programsService.deleteProgram(Number(id));
      res.status(200).json({ message: "Program deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to delete Program", details: error.message });
    }
  }
}

module.exports = new ProgramsController();
