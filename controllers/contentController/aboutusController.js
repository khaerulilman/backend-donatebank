const AboutUsService = require("../../services/contentEdit/aboutusService");
const aboutUsService = new AboutUsService();

class AboutUsController {
  // Get all AboutUs entries
  async getAllAboutUs(req, res) {
    try {
      const aboutUsEntries = await aboutUsService.getAllAboutUs();
      res.status(200).json(aboutUsEntries);
    } catch (error) {
      res.status(500).json({
        error: "Failed to fetch AboutUs entries",
        details: error.message,
      });
    }
  }

  // Get AboutUs entry by ID
  async getAboutUsById(req, res) {
    try {
      const { id } = req.params;
      const aboutUs = await aboutUsService.getAboutUsById(Number(id));

      if (!aboutUs) {
        return res.status(404).json({ error: "AboutUs entry not found" });
      }

      res.status(200).json(aboutUs);
    } catch (error) {
      res.status(500).json({
        error: "Failed to fetch AboutUs entry",
        details: error.message,
      });
    }
  }

  // Create new AboutUs entry
  async createAboutUs(req, res) {
    try {
      const { contentType, content } = req.body;

      if (!contentType || !content) {
        return res
          .status(400)
          .json({ error: "Content type and content are required" });
      }

      const newAboutUs = await aboutUsService.createAboutUs(
        contentType,
        content
      );
      res.status(201).json(newAboutUs);
    } catch (error) {
      res.status(500).json({
        error: "Failed to create AboutUs entry",
        details: error.message,
      });
    }
  }

  // Update AboutUs entry
  async updateAboutUs(req, res) {
    try {
      const { id } = req.params;
      const { contentType, content } = req.body;

      const existingAboutUs = await aboutUsService.getAboutUsById(Number(id));

      if (!existingAboutUs) {
        return res.status(404).json({ error: "AboutUs entry not found" });
      }

      const updatedAboutUs = await aboutUsService.updateAboutUs(
        Number(id),
        contentType || existingAboutUs.contentType,
        content || existingAboutUs.content
      );

      res.status(200).json(updatedAboutUs);
    } catch (error) {
      res.status(500).json({
        error: "Failed to update AboutUs entry",
        details: error.message,
      });
    }
  }

  // Delete AboutUs entry
  async deleteAboutUs(req, res) {
    try {
      const { id } = req.params;

      const existingAboutUs = await aboutUsService.getAboutUsById(Number(id));

      if (!existingAboutUs) {
        return res.status(404).json({ error: "AboutUs entry not found" });
      }

      await aboutUsService.deleteAboutUs(Number(id));
      res.status(200).json({ message: "AboutUs entry deleted successfully" });
    } catch (error) {
      res.status(500).json({
        error: "Failed to delete AboutUs entry",
        details: error.message,
      });
    }
  }
}

module.exports = new AboutUsController();
