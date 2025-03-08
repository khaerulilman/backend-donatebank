const AboutUsRepository = require("../../repositories/contentEdit/aboutusRepository");

class AboutUsService {
  constructor() {
    this.aboutUsRepository = new AboutUsRepository();
  }

  async getAllAboutUs() {
    return await this.aboutUsRepository.findAll();
  }

  async getAboutUsById(id) {
    return await this.aboutUsRepository.findById(id);
  }

  async createAboutUs(contentType, content) {
    const aboutUsData = {
      contentType,
      content,
    };

    return await this.aboutUsRepository.create(aboutUsData);
  }

  async updateAboutUs(id, contentType, content) {
    const aboutUsData = {
      contentType,
      content,
    };

    return await this.aboutUsRepository.update(id, aboutUsData);
  }

  async deleteAboutUs(id) {
    return await this.aboutUsRepository.delete(id);
  }
}

module.exports = AboutUsService;
