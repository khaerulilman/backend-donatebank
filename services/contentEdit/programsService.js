const ProgramsRepository = require("../../repositories/contentEdit/programRepository");

class ProgramsService {
  constructor() {
    this.programsRepository = new ProgramsRepository();
  }

  async getAllPrograms() {
    return await this.programsRepository.findAll();
  }

  async getProgramById(id) {
    return await this.programsRepository.findById(id);
  }

  async createProgram(contentType, content) {
    const programData = {
      contentType,
      content,
    };

    return await this.programsRepository.create(programData);
  }

  async updateProgram(id, contentType, content) {
    const programData = {
      contentType,
      content,
    };

    return await this.programsRepository.update(id, programData);
  }

  async deleteProgram(id) {
    return await this.programsRepository.delete(id);
  }
}

module.exports = ProgramsService;
