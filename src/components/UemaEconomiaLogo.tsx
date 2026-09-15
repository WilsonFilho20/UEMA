import React from 'react';

interface UemaEconomiaLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'horizontal' | 'badge';
  color?: 'white' | 'navy' | 'original';
}

export const UemaEconomiaLogo: React.FC<UemaEconomiaLogoProps> = ({
  className = 'h-12',
  variant = 'full',
  color = 'white'
}) => {
  const textColor = color === 'white' ? '#FFFFFF' : color === 'navy' ? '#002752' : '#002752';
  const subtitleColor = color === 'white' ? '#E2E8F0' : '#475569';
  const dividerColor = color === 'white' ? '#94A3B8' : '#CBD5E1';
  const accentColor = '#ebc000'; // UEMA Gold

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-2 select-none ${className}`}>
        {/* Símbolo do Curso de Economia: Engrenagem + Globo */}
        <svg viewBox="0 0 100 100" className="h-full w-auto aspect-square shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill={color === 'white' ? '#002752' : '#FFFFFF'} stroke={accentColor} strokeWidth="3" />
          {/* Engrenagem da esquerda */}
          <path
            d="M 50 15 
               A 35 35 0 0 0 15 50 
               A 35 35 0 0 0 50 85 
               L 50 72 
               A 22 22 0 0 1 28 50 
               A 22 22 0 0 1 50 28 
               Z"
            fill={textColor}
          />
          {/* Dentes da engrenagem */}
          <rect x="7" y="44" width="9" height="12" rx="2" fill={textColor} />
          <rect x="14" y="24" width="9" height="12" rx="2" transform="rotate(-40 18.5 30)" fill={textColor} />
          <rect x="14" y="64" width="9" height="12" rx="2" transform="rotate(40 18.5 70)" fill={textColor} />
          <rect x="30" y="10" width="12" height="9" rx="2" transform="rotate(-20 36 14.5)" fill={textColor} />
          <rect x="30" y="81" width="12" height="9" rx="2" transform="rotate(20 36 85.5)" fill={textColor} />
          {/* Globo da direita com paralelos e meridianos */}
          <path
            d="M 50 15 
               A 35 35 0 0 1 85 50 
               A 35 35 0 0 1 50 85 
               Z"
            stroke={textColor}
            strokeWidth="5"
            fill="none"
          />
          {/* Linhas de latitude e longitude do globo */}
          <path d="M 50 50 L 85 50" stroke={textColor} strokeWidth="4" />
          <path d="M 50 28 Q 72 32 80 50" stroke={textColor} strokeWidth="4" fill="none" />
          <path d="M 50 72 Q 72 68 80 50" stroke={textColor} strokeWidth="4" fill="none" />
          <path d="M 50 15 A 18 35 0 0 1 50 85" stroke={textColor} strokeWidth="4" fill="none" />
          {/* Folha central / símbolo do valor econômico */}
          <path d="M 33 60 C 33 45 42 38 48 34 C 48 45 42 58 33 60 Z" fill={textColor} />
        </svg>
        <div className="flex flex-col leading-tight">
          <span className="font-extrabold text-sm tracking-tight" style={{ color: textColor }}>
            Economia
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: subtitleColor }}>
            Bacharelado • UEMA
          </span>
        </div>
      </div>
    );
  }

  // Full and Horizontal Logo Banner (replicating the official uploaded image)
  return (
    <div
      className={`inline-flex items-center select-none ${className}`}
      style={{ minHeight: '44px' }}
      title="UEMA - Universidade Estadual do Maranhão | Economia Bacharelado"
    >
      <svg
        viewBox="0 0 760 170"
        className="h-full w-auto max-w-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ======================================================== */}
        {/* SEÇÃO 1: BRASÃO INSTITUCIONAL DA UEMA (LADO ESQUERDO) */}
        {/* ======================================================== */}
        <g transform="translate(10, 5)">
          {/* Círculo do brasão */}
          <circle cx="75" cy="80" r="70" stroke={textColor} strokeWidth="4" fill="none" strokeDasharray="5,2" />
          <circle cx="75" cy="80" r="63" stroke={textColor} strokeWidth="2.5" fill="none" />

          {/* Texto em arco superior: UNIVERSIDADE ESTADUAL DO MARANHÃO */}
          <path id="curveUemaTop" d="M 22 75 A 55 55 0 0 1 128 75" fill="none" />
          <text fontSize="7.5" fontWeight="900" fill={textColor} letterSpacing="1.2">
            <textPath href="#curveUemaTop" startOffset="50%" textAnchor="middle">
              UNIVERSIDADE ESTADUAL DO MARANHÃO
            </textPath>
          </text>

          {/* Estrelas laterais */}
          <text x="24" y="88" fontSize="8" fill={textColor}>★★★</text>
          <text x="110" y="88" fontSize="8" fill={textColor}>★★★</text>

          {/* Escudo central com a bandeira do Maranhão e Livro */}
          <g transform="translate(47, 45)">
            {/* Contorno do escudo */}
            <path
              d="M 0 0 L 56 0 L 56 32 C 56 50 28 62 28 62 C 28 62 0 50 0 32 Z"
              fill={color === 'white' ? '#001A38' : '#F1F5F9'}
              stroke={textColor}
              strokeWidth="2.5"
            />
            {/* Listras horizontais do Maranhão (Branco, Preto, Vermelho) */}
            <rect x="2" y="2" width="52" height="7" fill={textColor} fillOpacity="0.2" />
            <rect x="2" y="9" width="52" height="7" fill={textColor} fillOpacity="0.8" />
            <rect x="2" y="16" width="52" height="7" fill={textColor} fillOpacity="0.3" />
            {/* Estrela no cantão superior esquerdo */}
            <polygon points="10,4 12,8 16,8 13,11 14,15 10,13 6,15 7,11 4,8 8,8" fill={textColor} />
            {/* Livro aberto estilizado e pena */}
            <g transform="translate(12, 26)">
              <path d="M 0 10 Q 16 5 32 10 L 32 20 Q 16 16 0 20 Z" fill={textColor} />
              <path d="M 16 7 L 16 20" stroke={color === 'white' ? '#002752' : '#FFFFFF'} strokeWidth="1.5" />
              {/* Pena cruzada */}
              <line x1="28" y1="2" x2="6" y2="18" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" />
            </g>
          </g>

          {/* Faixa UEMA */}
          <rect x="42" y="112" width="66" height="15" rx="3" fill={textColor} />
          <text x="75" y="123" fontSize="11" fontWeight="900" fill={color === 'white' ? '#002752' : '#FFFFFF'} textAnchor="middle" letterSpacing="1.5">
            UEMA
          </text>

          {/* Faixa inferior: SCIENTIA AD VITAM */}
          <path id="curveUemaBottom" d="M 28 126 A 58 58 0 0 0 122 126" fill="none" />
          <text fontSize="7.5" fontWeight="900" fill={textColor} letterSpacing="1.4">
            <textPath href="#curveUemaBottom" startOffset="50%" textAnchor="middle">
              SCIENTIA AD VITAM
            </textPath>
          </text>
        </g>

        {/* ======================================================== */}
        {/* SEÇÃO 2: NOME INSTITUCIONAL "Uema UNIVERSIDADE ESTADUAL" */}
        {/* ======================================================== */}
        <g transform="translate(180, 52)">
          {/* Logo Uema com a tipografia estilizada */}
          <text x="0" y="42" fontSize="52" fontWeight="900" fill={textColor} fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-1">
            Uema
          </text>
          {/* Subtítulo institucional em caixa alta */}
          <text x="0" y="66" fontSize="13" fontWeight="800" fill={subtitleColor} letterSpacing="1.5" fontFamily="system-ui, -apple-system, sans-serif">
            UNIVERSIDADE ESTADUAL
          </text>
          <text x="0" y="83" fontSize="13" fontWeight="800" fill={subtitleColor} letterSpacing="1.5" fontFamily="system-ui, -apple-system, sans-serif">
            DO MARANHÃO
          </text>
        </g>

        {/* ======================================================== */}
        {/* SEÇÃO 3: LINHA DIVISÓRIA VERTICAL */}
        {/* ======================================================== */}
        <line x1="405" y1="42" x2="405" y2="138" stroke={dividerColor} strokeWidth="4.5" strokeLinecap="round" />

        {/* ======================================================== */}
        {/* SEÇÃO 4: SÍMBOLO DA CIÊNCIA ECONÔMICA (COFECON) */}
        {/* Engrenagem da Indústria + Globo Terrestre Macro */}
        {/* ======================================================== */}
        <g transform="translate(435, 42)">
          {/* Símbolo diâmetro 96px */}
          {/* Engrenagem da esquerda */}
          <g>
            {/* Arco principal da engrenagem */}
            <path
              d="M 48 8 
                 A 40 40 0 0 0 8 48 
                 A 40 40 0 0 0 48 88 
                 L 48 72 
                 A 24 24 0 0 1 24 48 
                 A 24 24 0 0 1 48 24 
                 Z"
              fill={textColor}
            />
            {/* Dentes retos salientes da engrenagem */}
            <rect x="0" y="41" width="12" height="14" rx="2" fill={textColor} />
            <rect x="5" y="18" width="12" height="13" rx="2" transform="rotate(-40 11 24.5)" fill={textColor} />
            <rect x="5" y="64" width="12" height="13" rx="2" transform="rotate(40 11 70.5)" fill={textColor} />
            <rect x="23" y="2" width="14" height="12" rx="2" transform="rotate(-20 30 8)" fill={textColor} />
            <rect x="23" y="82" width="14" height="12" rx="2" transform="rotate(20 30 88)" fill={textColor} />
            {/* Elemento de folhas/cifrão interno estilizado */}
            <path d="M 28 62 C 28 44 38 34 46 30 C 46 44 38 60 28 62 Z" fill={textColor} />
            <path d="M 36 68 C 36 54 42 46 47 42 C 47 52 42 66 36 68 Z" fill={textColor} />
          </g>

          {/* Globo da direita */}
          <g>
            {/* Círculo externo do globo */}
            <path
              d="M 52 8 
                 A 40 40 0 0 1 92 48 
                 A 40 40 0 0 1 52 88 
                 Z"
              stroke={textColor}
              strokeWidth="6"
              fill="none"
            />
            {/* Linha equatorial */}
            <path d="M 52 48 L 92 48" stroke={textColor} strokeWidth="5.5" />
            {/* Paralelos */}
            <path d="M 52 24 Q 76 28 87 48" stroke={textColor} strokeWidth="5" fill="none" />
            <path d="M 52 72 Q 76 68 87 48" stroke={textColor} strokeWidth="5" fill="none" />
            {/* Meridiano principal */}
            <path d="M 52 8 A 20 40 0 0 1 52 88" stroke={textColor} strokeWidth="5" fill="none" />
          </g>
        </g>

        {/* ======================================================== */}
        {/* SEÇÃO 5: "Economia Bacharelado" */}
        {/* ======================================================== */}
        <g transform="translate(565, 52)">
          {/* Economia */}
          <text
            x="0"
            y="48"
            fontSize="52"
            fontWeight="900"
            fill={textColor}
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="-0.5"
          >
            Economia
          </text>
          {/* Bacharelado */}
          <text
            x="0"
            y="82"
            fontSize="30"
            fontWeight="800"
            fill={textColor}
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="0.5"
          >
            Bacharelado
          </text>
        </g>
      </svg>
    </div>
  );
};
