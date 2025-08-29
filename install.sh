#!/bin/bash

# FRAIM One-Line Installer
# Framework for Rigor-based AI Management
# Where humans become AI managers through rigorous methodology

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Banner
echo -e "${BLUE}"
cat << 'EOF'
╔══════════════════════════════════════════════════════════════╗
║  🚀 FRAIM                                                  ║
║  Framework for Rigor-based AI Management                    ║
║  Where humans become AI managers                            ║
╚══════════════════════════════════════════════════════════════╝
EOF
echo -e "${NC}"

echo -e "${GREEN}🤖 Welcome to FRAIM!${NC}"
echo -e "${GREEN}Where humans become AI managers through rigorous methodology${NC}\n"

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo -e "${RED}❌ Error: Not in a git repository${NC}"
    echo "Please run this script from within a git repository."
    exit 1
fi

# Check if FRAIM is already installed
if [ -d "FRAIM" ]; then
    echo -e "${YELLOW}⚠️  FRAIM appears to already be installed in this repository${NC}"
    echo "If you want to reinstall, please remove the existing FRAIM folder first."
    exit 1
fi

echo -e "${BLUE}📥 Installing FRAIM framework...${NC}"

# Download FRAIM from GitHub
echo "Downloading FRAIM framework..."
curl -sSL https://raw.githubusercontent.com/mathursrus/Ashley-Calendar-AI/master/FRAIM/install.sh | bash -s -- --repo $(git remote get-url origin | sed 's/.*github.com[:/]\([^/]*\/[^/]*\).*/\1/' | sed 's/\.git$//')

echo -e "\n${GREEN}✅ FRAIM installation complete!${NC}"
echo -e "\n${BLUE}🚀 Next steps:${NC}"
echo "1. Review the FRAIM folder that was created"
echo "2. Run: npx @fraim/framework init"
echo "3. Start managing your AI agents with RIGOR methodology!"
echo -e "\n${BLUE}📚 Learn more:${NC}"
echo "Documentation: https://github.com/mathursrus/Ashley-Calendar-AI/tree/master/FRAIM"
echo -e "\n${GREEN}🎯 Ready to become an AI manager?${NC}"
echo "The FRAIM framework is now installed and ready to use!"
