import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting} from 'obsidian';

export default class AlignmentTrackerPlugin extends Plugin
{
    async onload()
    {
        // Registers the block "alignmenttracker"
        this.registerMarkdownCodeBlockProcessor("alignmenttracker", (source, el, ctx) => {
            const values = this.parseSource(source);
            const final_values = this.calculateValues(values);
            this.renderAlignmentGrid(final_values, el);
        });
    }

    // Parses the content of the code block
    parseSource(source: string)
    {
        const values = {
            L: 0, C: 0,
            G: 0, E: 0,
        };
        source.split("\n").forEach(line => {
            const [key, value] = line.split(":");
            if (key && value) {
                values[key.trim()] = parseInt(value.trim());
            }
        });
        return values;
    }

    // Calculate Alignment Values
    calculateValues(values: any)
    {
      const final_values = {
          LG: 0, LN: 0, LE: 0,
          NG: 0, N:  0, NE: 0,
          CG: 0, CN: 0, CE: 0,
      };

      // Get total variables
      let total = values.L + values.C + values.G + values.E;
      let N_LC = Math.floor((values.L + values.C)/2);
      let N_GE = Math.floor((values.G + values.E)/2);

      // Get the multiplying factor
      let scale = 10.0 / total;

      // Generate all the values:
      /// Lawfull column
      final_values.LG = Math.floor((values.L + values.G) * scale);
      final_values.LN = Math.floor((values.L + N_GE)     * scale);
      final_values.LE = Math.floor((values.L + values.E) * scale);

      /// Neutral column
      final_values.NG = Math.floor((N_LC + values.G) * scale);
      final_values.N  = Math.floor((N_LC + N_GE)     * scale);
      final_values.NE = Math.floor((N_LC + values.E) * scale);

      /// Chaotic column
      final_values.CG = Math.floor((values.C + values.G) * scale);
      final_values.CN = Math.floor((values.C + N_GE)     * scale);
      final_values.CE = Math.floor((values.C + values.E) * scale);

      return final_values;
    }

    // Renderizes the grid using HTML
    renderAlignmentGrid(values: any, el: HTMLElement)
    {
        const grid = document.createElement("div");
        grid.className = "alignment-grid";

        const alignments = [
            { name: "LG", value: values.LG },
            { name: "NG", value: values.NG },
            { name: "CG", value: values.CG },
            { name: "LN", value: values.LN },
            { name: "N",  value: values.N  },
            { name: "CN", value: values.CN },
            { name: "LE", value: values.LE },
            { name: "NE", value: values.NE },
            { name: "CE", value: values.CE }
        ];

        alignments.forEach(align => {
            const cell = document.createElement("div");
            cell.className = "alignment-cell";
            cell.setAttribute("data-value", align.value.toString());
            cell.textContent = align.name;
            grid.appendChild(cell);
        });

        el.appendChild(grid);
    }
}
