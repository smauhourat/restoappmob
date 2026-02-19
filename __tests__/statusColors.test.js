import { colorByStatus } from '../components/utils/statusColors';

describe('statusColors', () => {
  describe('colorByStatus', () => {
    it('should return yellow for pendiente status', () => {
      expect(colorByStatus('pendiente')).toBe('#FBD051');
    });

    it('should return blue for enviado status', () => {
      expect(colorByStatus('enviado')).toBe('#75abfc');
    });

    it('should return green for recibido status', () => {
      expect(colorByStatus('recibido')).toBe('#8ab9a3');
    });

    it('should return red for cancelado status', () => {
      expect(colorByStatus('cancelado')).toBe('#e98993');
    });

    it('should return gray for unknown status', () => {
      expect(colorByStatus('unknown')).toBe('#a8aaac');
    });

    it('should handle case insensitive status', () => {
      expect(colorByStatus('PENDIENTE')).toBe('#FBD051');
      expect(colorByStatus('Pendiente')).toBe('#FBD051');
    });

    it('should handle null or undefined status', () => {
      expect(colorByStatus(null)).toBe('#a8aaac');
      expect(colorByStatus(undefined)).toBe('#a8aaac');
    });

    it('should handle empty string', () => {
      expect(colorByStatus('')).toBe('#a8aaac');
    });
  });
});
